import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TahunJumlahDto } from './dto';
// import { Prisma } from '@prisma/client';

@Injectable()
export class PtnService {
  constructor(private readonly prisma: PrismaService) {}

  // Get List Universitas
  async getListUniversitas(): Promise<any> {
    const ptn = await this.prisma.ptnClient.t_perguruan_tinggi.findMany({
      where: {
        c_jenis: 'Negeri',
      },
      select: {
        c_id_perguruan_tinggi: true,
        c_nama_perguruan_tinggi: true,
        c_akronim: true,
        c_jenis: true,
        t_jurusan: {
          select: {
            c_id_jurusan: true,
          },
        },
      },
      orderBy: {
        c_nama_perguruan_tinggi: 'asc',
      },
    });

    const formatedData = ptn
      .map((item) => {
        if (!item.t_jurusan.length) {
          return false;
        }
        return {
          id_universitas: item.c_id_perguruan_tinggi,
          nama_universitas: item.c_nama_perguruan_tinggi,
          akronim_universitas: item.c_akronim,
          jenis: item.c_jenis,
        };
      })
      .filter((item) => item !== false);

    if (!formatedData)
      throw new NotFoundException('Data universitas tidak ditemukan');

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Data universitas berhasil ditemukan',
      },
      data: formatedData,
    };
  }

  // Get List Jurusan by Universitas Id
  async getListJurusan(id: number): Promise<any> {
    const listJurusan = await this.prisma.ptnClient.t_jurusan.findMany({
      where: {
        c_id_perguruan_tinggi: Number(id),
      },
      select: {
        c_id_perguruan_tinggi: true,
        t_perguruan_tinggi: {
          select: {
            c_nama_perguruan_tinggi: true,
            c_akronim: true,
          },
        },
        c_id_jurusan: true,
        c_nama_jurusan: true,
        c_kode_kelompok_jurusan: true,
        t_kelompok_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_kode_rumpun_jurusan: true,
        t_rumpun_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_keterangan: true,
        c_pg: true,
        c_lintas_jurusan: true,
        t_jurusan_deskripsi: {
          select: {
            c_deskripsi: true,
            c_lapangan_kerja: true,
          },
        },
      },
    });

    if (!listJurusan) throw new NotFoundException();

    const renamedData = listJurusan.map((item) => {
      return {
        id_universitas: item.c_id_perguruan_tinggi,
        nama_universitas: item.t_perguruan_tinggi.c_nama_perguruan_tinggi,
        akronim_universitas: item.t_perguruan_tinggi.c_akronim,
        id_jurusan: item.c_id_jurusan,
        nama_jurusan: item.c_nama_jurusan,
        kelompok_jurusan: item.t_kelompok_jurusan.c_deskripsi,
        rumpun_jurusan: item.t_rumpun_jurusan.c_deskripsi,
        info: item.c_keterangan,
        passing_grade: item.c_pg,
        lintas_jurusan: item.c_lintas_jurusan === 'Y' ? true : false,
        deskripsi: item.t_jurusan_deskripsi
          ? item.t_jurusan_deskripsi.c_deskripsi
          : 'Deskripsi jurusan belum tersedia',
        lapangan_kerja: item.t_jurusan_deskripsi
          ? item.t_jurusan_deskripsi.c_lapangan_kerja
          : 'Info lapangan kerja belum tersedia',
      };
    });

    const result = renamedData;

    return result;
  }

  // Get Detail Jurusan by Jurusan Id
  async getDetailJurusan(id: number) {
    const jurusan = await this.prisma.ptnClient.t_jurusan.findUnique({
      where: {
        c_id_jurusan: Number(id),
      },
      select: {
        c_id_perguruan_tinggi: true,
        t_perguruan_tinggi: {
          select: {
            c_nama_perguruan_tinggi: true,
            c_akronim: true,
          },
        },
        c_id_jurusan: true,
        c_nama_jurusan: true,
        c_kode_kelompok_jurusan: true,
        t_kelompok_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_kode_rumpun_jurusan: true,
        t_rumpun_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_keterangan: true,
        c_pg: true,
        c_lintas_jurusan: true,
        t_jurusan_deskripsi: {
          select: {
            c_deskripsi: true,
            c_lapangan_kerja: true,
          },
        },
      },
    });

    if (!jurusan) throw new NotFoundException('Data jurusan tidak ditemukan');

    const renamedData = {
      id_universitas: jurusan.c_id_perguruan_tinggi,
      nama_universitas: jurusan.t_perguruan_tinggi.c_nama_perguruan_tinggi,
      akronim_universitas: jurusan.t_perguruan_tinggi.c_akronim,
      id_jurusan: jurusan.c_id_jurusan,
      nama_jurusan: jurusan.c_nama_jurusan,
      kelompok_jurusan: jurusan.t_kelompok_jurusan.c_deskripsi,
      rumpun_jurusan: jurusan.t_rumpun_jurusan.c_deskripsi,
      info: jurusan.c_keterangan,
      passing_grade: jurusan.c_pg,
      lintas_jurusan: jurusan.c_lintas_jurusan === 'Y' ? true : false,
      deskripsi: jurusan.t_jurusan_deskripsi
        ? jurusan.t_jurusan_deskripsi.c_deskripsi
        : 'Deskripsi jurusan belum tersedia',
      lapangan_kerja: jurusan.t_jurusan_deskripsi
        ? jurusan.t_jurusan_deskripsi.c_lapangan_kerja
        : 'Info lapangan kerja belum tersedia',
    };

    function tambahDataTahun(data: TahunJumlahDto[]): TahunJumlahDto[] {
      const result: any[] = [];

      if (!data) return [];

      for (let tahun = 2015; tahun <= 2023; tahun++) {
        const existData = data.find((item) => item.tahun == tahun);
        if (existData) {
          result.push({ x: existData.tahun, y: existData.jml });
        } else {
          result.push({ x: tahun, y: 0 });
        }
      }

      return result;
    }

    renamedData.info['peminat'] = tambahDataTahun(renamedData.info['peminat']);
    renamedData.info['tampung'] = tambahDataTahun(renamedData.info['tampung']);

    const result = renamedData;

    return {
      meta: {
        code: HttpStatus.OK,
        message: 'Data jurusan berhasil ditemukan',
      },
      data: result,
    };
  }

  // Get Ptn Pilihan Siswa by Siswa Id
  async getDataPilihanPtnSiswa(id: number) {
    const pilihanPtn =
      await this.prisma.userClient.t_pilihan_ptn_siswa.findUnique({
        where: {
          c_no_register: id,
        },
        select: {
          c_pilihan: true,
        },
      });

    if (!pilihanPtn)
      throw new NotFoundException('Data Pilihan PTN siswa tidak ditemukan');

    const historyPtnPilihan =
      Array.isArray(pilihanPtn.c_pilihan['historyPilihan']) &&
      pilihanPtn.c_pilihan['historyPilihan'].map((v) => v.idJurusan);

    const dataPtnPilihan = await this.prisma.ptnClient.t_jurusan.findMany({
      where: {
        c_id_jurusan: {
          in: [
            Number(pilihanPtn.c_pilihan['pilihan1']),
            Number(pilihanPtn.c_pilihan['pilihan2']),
          ],
        },
      },
      select: {
        c_id_perguruan_tinggi: true,
        t_perguruan_tinggi: {
          select: {
            c_nama_perguruan_tinggi: true,
            c_akronim: true,
          },
        },
        c_id_jurusan: true,
        c_nama_jurusan: true,
        c_keterangan: true,
        c_pg: true,
      },
    });

    const historyPilihan = await this.prisma.ptnClient.t_jurusan.findMany({
      where: {
        c_id_jurusan: {
          in: historyPtnPilihan,
        },
      },
      select: {
        c_id_perguruan_tinggi: true,
        t_perguruan_tinggi: {
          select: {
            c_nama_perguruan_tinggi: true,
            c_akronim: true,
          },
        },
        c_id_jurusan: true,
        c_nama_jurusan: true,
        c_keterangan: true,
        c_pg: true,
      },
    });

    const respPtnPilihan = dataPtnPilihan.map((data) => {
      return {
        id_universitas: data.c_id_perguruan_tinggi,
        nama_universitas: data.t_perguruan_tinggi.c_nama_perguruan_tinggi,
        akronim_universitas: data.t_perguruan_tinggi.c_akronim,
        id_jurusan: data.c_id_jurusan,
        nama_jurusan: data.c_nama_jurusan,
        info: data.c_keterangan,
        passing_grade: data.c_pg,
      };
    });

    const respHistoryPilihan = historyPilihan.map((data) => {
      return {
        id_universitas: data.c_id_perguruan_tinggi,
        nama_universitas: data.t_perguruan_tinggi.c_nama_perguruan_tinggi,
        akronim_universitas: data.t_perguruan_tinggi.c_akronim,
        id_jurusan: data.c_id_jurusan,
        nama_jurusan: data.c_nama_jurusan,
        info: data.c_keterangan,
        passing_grade: data.c_pg,
      };
    });

    return {
      data: {
        aktif: respPtnPilihan,
        history: respHistoryPilihan,
      },
    };
  }
}
