// Base Environment Class
class BaseEnvironment {
    constructor(stage, config) {
      this.stage = stage;
      this.config = config;
    }
  
    getStage() {
      return this.stage;
    }
  
    getFeatureConfig(feature) {
      return this.config[feature] || {};
    }
  
    getConfig(key) {
      return this.config[key];
    }
  }
  
  // Development Environment
  class DevelopmentEnvironment extends BaseEnvironment {
    constructor() {
      super('DEV', {
        wa: {
          apiUrl: 'https://dev-wa-api.triggrsweb.com',
          wsEndpoint: 'wss://2imq5g0ifi.execute-api.ap-south-1.amazonaws.com/dev'
        },
        frontend: {
          url: 'http://localhost:3000',
        },
      });
    }
  }
  
  // Staging Environment
  class StagingEnvironment extends BaseEnvironment {
    constructor() {
      super('STAGE', {
        wa: {
          apiUrl: 'https://stage-wa-api.triggrsweb.com',
          wsEndpoint: 'wss://2imq5g0ifi.execute-api.ap-south-1.amazonaws.com/dev'
        },
        frontend: {
          url: 'http://localhost:3000', // Here should be a staging url but i have added staging url in frontend
        },
      });
    }
  }
  
  // Production Environment
  class ProductionEnvironment extends BaseEnvironment {
    constructor() {
      super('LIVE', {
        flight: {
          apiUrl: 'https://wa-api.triggrsweb.com',
          wsEndpoint: 'wss://2imq5g0ifi.execute-api.ap-south-1.amazonaws.com/dev'
        },
        frontend: {
          url: 'https://chat.triggrsweb.com',
        },
      });
    }
  }
  
  // Environment Factory
  class EnvironmentFactory {
    static getEnvironment(stage) {
      switch (stage) {
        case 'LIVE':
          return new ProductionEnvironment();
        case 'STAGE':
          return new StagingEnvironment(); // Only for staging and testing whether code works or not in live environment
        case 'DEV':
        default:
          return new DevelopmentEnvironment();
      }
    }
  }
  
  export { EnvironmentFactory };  