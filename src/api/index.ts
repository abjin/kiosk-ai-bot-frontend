import BaseRestApi from './base-rest-api';

class Api extends BaseRestApi {
  getAiCompletions(userInput: string): Promise<GetAiCompletionsResponse> {
    return this.GET('/openai/chat/completions', { userInput });
  }
}

export default new Api();
