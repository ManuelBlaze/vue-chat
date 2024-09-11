import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatView from '@/views/ChatView.vue';
import MessageBox from '@/components/chat/MessageBox.vue';

const mockChatMessages = {
  template: '<div data-testid="mock-messages">Mock ChatMessages</div>',
};

describe('ChatView', () => {
  it('should properly renders chat messages and message box', () => {
    const wrapper = mount(ChatView);
    expect(wrapper.html).toMatchSnapshot();

    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true);
  });

  it('should emit onMessage when sending a message', async () => {
    const wrapper = mount(ChatView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    });

    const messageBoxComponent = wrapper.findComponent(MessageBox);
    messageBoxComponent.vm.$emit('sendMessage', 'Wenas');

    await new Promise<void>((r) => setTimeout(r, 150));
    expect(wrapper.html).toMatchSnapshot();
  });
});
