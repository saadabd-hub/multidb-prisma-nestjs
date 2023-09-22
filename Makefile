PHONY: pull generate

pull: db_pt_pull db_user_pull
generate: db_pt_generate db_user_generate

# PULL
db_pt_pull:
	npx prisma db pull --schema=db/db_pt/schema.prisma

db_user_pull:
	npx prisma db pull --schema=db/db_user/schema.prisma

# GENERATE
db_pt_generate:
	npx prisma generate --schema=db/db_pt/schema.prisma

db_user_generate:
	npx prisma generate --schema=db/db_user/schema.prisma
