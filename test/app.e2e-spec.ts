import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import * as request from 'supertest';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../src/app.module";


describe('Testes da tabela de Tarefas (e2e)', () => {
  let app: INestApplication;

  let  idTarefa: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_todo_teste',
          autoLoadEntities: true,
          logging: false,
          synchronize: true,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Teste para criar tarefas na tabela
  it('01- Deve criar uma tarefa no banco', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'Tarefa Diurna',  
        descricao: 'Tarefa feita pela manhã',
        responsavel: 'Muca',
        data: '2022-09-15',
        status: true
      })
      .expect(201)
      
      idTarefa = response.body.id

  })

  it('02- Não irá atualizar uma tarefa que não existe no banco', async () => {
    return request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id: 500,
      nome: 'Tarefa Diurna',  
      descricao: 'Tarefa feita pela manhã',
      responsavel: 'Muca',
      data: '2022-09-15',
      status: true
    })
    .expect(404)
  })

  afterAll(async () => {
    await app.close()
  })

});
