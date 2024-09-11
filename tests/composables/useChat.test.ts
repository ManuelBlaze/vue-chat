import { useChat } from '@/composables/useChat';

describe('useChat composable', () => {
  it('should correctly add message when onMessage is called', async () => {
    const text = 'Hola mundo!';
    const { messages, onMessage } = useChat();

    expect(messages.value.length).toBe(0);
    await onMessage(text);
    expect(messages.value.length).toBe(1);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
  });

  it('should do nothing if text is empty', async () => {
    const text = '';
    const { messages, onMessage } = useChat();

    expect(messages.value.length).toBe(0);
    await onMessage(text);
    expect(messages.value.length).toBe(0);
  });

  it('should get a response when message ends with "?"', async () => {
    const text = 'Quieres café?';
    const { messages, onMessage } = useChat();

    expect(messages.value.length).toBe(0);
    await onMessage(text);
    await new Promise<void>((r) => setTimeout(r, 1600));

    const [myMessage, response] = messages.value;
    expect(messages.value.length).toBe(2);
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
    expect(response).toEqual({
      id: expect.any(Number),
      itsMine: false,
      message: expect.any(String),
      image: expect.any(String),
    });
  });

  test('mock-response -fetch api', async () => {
    const mockResponse = {
      answer: 'yes',
      image: 'test-url',
    };

    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));

    const text = 'Quieres café?';
    const { messages, onMessage } = useChat();

    await onMessage(text);
    await new Promise<void>((r) => setTimeout(r, 1600));

    const [, response] = messages.value;
    expect(response).toEqual({
      id: expect.any(Number),
      itsMine: false,
      message: mockResponse.answer,
      image: mockResponse.image,
    });
  });
});
