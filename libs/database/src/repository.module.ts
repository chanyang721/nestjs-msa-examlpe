import { DataSource, DataSourceOptions }   from "typeorm";
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { getDataSourceToken }              from "@nestjs/typeorm";


@Module({})
export class RepositoryModule {
  public static forFeature<T extends new ( ...args: any[] ) => any>(
    repositories: T[],
    connectionName: string | DataSource | DataSourceOptions
  ): DynamicModule {
    console.log("RepositoryModule.forFeature", repositories, connectionName);
    const providers: Provider[] = [];

    for ( const repository of repositories ) {
      providers.push({
        inject    : [ getDataSourceToken(connectionName) ],
        provide   : repository,
        useFactory: ( dataSource: DataSource ): typeof repository => {
          return new repository(dataSource);
        }
      });

    }

    return {
      exports  : providers,
      providers: providers,
      module   : RepositoryModule
    };
  }
}
