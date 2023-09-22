import { Controller, Get, Param } from '@nestjs/common';
import { PtnService } from './ptn.service';

@Controller('ptn')
export class PtnController {
  constructor(private readonly ptnService: PtnService) {}

  @Get('universitas')
  getListUniversitas() {
    return this.ptnService.getListUniversitas();
  }

  @Get('universitas/:id')
  getListJurusan(@Param('id') id: number) {
    return this.ptnService.getListJurusan(id);
  }

  @Get('universitas/jurusan/:id')
  getDetailJurusan(@Param('id') id: number) {
    return this.ptnService.getDetailJurusan(id);
  }

  @Get('ptn-pilihan/:id')
  getPilihanPtnSiswa(@Param('id') id: number) {
    return this.ptnService.getDataPilihanPtnSiswa(id);
  }
}
