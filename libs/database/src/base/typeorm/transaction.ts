import { DataSource, QueryRunner }   from "typeorm";


export async function transaction<Input, Output>(
    dataSources: DataSource[],
    tryBlock: ( ...queryRunners: QueryRunner[] ) => Promise<Output>,
    catchBlock?: () => void
): Promise<Output> {
  const queryRunners: QueryRunner[] = [];
  for ( const dataSource of dataSources ) {
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      queryRunners.push(queryRunner);
  }

  try {
    const result: Output = await tryBlock(...queryRunners);
    for ( const queryRunner of queryRunners ) {
        await queryRunner.commitTransaction();
    }

    return result
  }
  catch ( error ) {
    await catchBlock?.();
    for ( const queryRunner of queryRunners ) {
        await queryRunner.rollbackTransaction();
    }

    throw error;
  }
  finally {
    for ( const queryRunner of queryRunners ) {
        await queryRunner.release();
    }
  }
}
