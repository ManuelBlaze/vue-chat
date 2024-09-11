import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';

interface Props {
  isTyping: boolean;
  messages: ChatMessage[];
}

const messages: ChatMessage[] = [
  {
    id: 1,
    message: 'hola?',
    itsMine: true,
  },
  {
    id: 2,
    message: 'yes',
    itsMine: false,
    image: 'testUrl',
  },
];

describe('ChatMessages', () => {
  const mountComponent = (props: Props) =>
    mount(ChatMessages, {
      props,
    });

  const wrapper = mountComponent({ messages, isTyping: false });

  it('should correctly renders chat messages component', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });

    expect(chatBubbles.length).toBe(messages.length);
  });

  it('should renders isTyping component if isTyping prop is true', () => {
    const wrapper = mountComponent({ messages, isTyping: true });

    const isTypingComponent = wrapper.findComponent({ name: 'IsTyping' });

    expect(isTypingComponent.exists()).toBe(true);
  });

  it('should not renders isTyping component if isTyping prop is false', () => {
    const wrapper = mountComponent({ messages, isTyping: false });

    const isTypingComponent = wrapper.findComponent({ name: 'IsTyping' });

    expect(isTypingComponent.exists()).toBe(false);
  });

  it('should scroll down to the page bottom after messages update', async () => {
    const scrollToSpy = vi.fn();
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    console.log(chatRef);
    chatRef.scrollTo = scrollToSpy;

    await wrapper.setProps({
      isTyping: false,
      messages: [
        ...messages,
        {
          id: 3,
          message: 'hey',
          itsMine: true,
        },
      ],
    });

    await new Promise<void>((r) => setTimeout(r, 150));
    expect(scrollToSpy).toHaveBeenCalledOnce();
    expect(scrollToSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: expect.any(Number),
    });
  });
});
