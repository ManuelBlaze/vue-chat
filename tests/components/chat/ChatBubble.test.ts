import { mount } from '@vue/test-utils';
import ChatBubble from '@/components/chat/ChatBubble.vue';

describe('ChatBubble', () => {
  it('should properly renders own message', () => {
    const message = 'Hello';
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: true },
    });

    expect(wrapper.find('.bg-blue-200').exists()).toBe(true);
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
    expect(wrapper.find('.bg-blue-200').text()).toContain(message);

    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
  });

  it('should properly renders response message', () => {
    const message = 'Hello';
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: false },
    });

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').text()).toContain(message);

    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('should properly renders response message with image', () => {
    const message = 'Hello';
    const image = 'test.jpg';
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: false, image },
    });

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').text()).toContain(message);

    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(image);
  });
});
