class MissingEnvironmentVariableError extends Error {
  constructor(environmentVariableName: string) {
    super(
      `Missing environment variable ${environmentVariableName}. Make sure to setup your .env file before running application.`
    );
  }
}

export { MissingEnvironmentVariableError };
