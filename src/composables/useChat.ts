import { ref } from 'vue';
import { sleep } from '@/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);
  const isTyping = ref<boolean>(false);

  const getResponse = async (): Promise<YesNoResponse> => {
    const resp = await fetch('https://yesno.wtf/api');
    return await resp.json();
  };

  const onMessage = async (text: string) => {
    if (!text.length) return;

    messages.value.push({
      id: new Date().getTime(),
      message: text,
      itsMine: true,
    });

    if (!text.endsWith('?')) return;

    isTyping.value = true;
    await sleep(1.5);
    const { answer, image } = await getResponse();
    isTyping.value = false;
    messages.value.push({
      id: new Date().getTime(),
      message: answer,
      itsMine: false,
      image,
    });
  };

  return {
    isTyping,
    messages,
    onMessage,
  };
};
