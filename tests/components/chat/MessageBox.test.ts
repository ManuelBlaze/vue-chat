import { mount } from '@vue/test-utils';
import MessageBox from '@/components/chat/MessageBox.vue';

describe('MessageBox', () => {
  const wrapper = mount(MessageBox);
  it('should properly renders input and button elements', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button svg').exists()).toBe(true);
  });

  it('should emits sendMessage with message attribute on click button', async () => {
    const message = 'Hola, buenas';

    await wrapper.find('input[type="text"]').setValue(message);
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
    expect((wrapper.vm as any).message).toBe('');
  });

  it('should emits sendMessage with message attribute on key press enter is triggered', async () => {
    const message = 'Hola, buenas';

    const input = wrapper.find('input[type="text"]');
    await input.setValue(message);
    await input.trigger('keypress.enter');

    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
    expect((wrapper.vm as any).message).toBe('');
  });

  it('should not emit the sendMessage event if there is no message', async () => {
    const wrapper = mount(MessageBox);

    const input = wrapper.find('input[type="text"]');
    await input.trigger('keypress.enter');
    await wrapper.find('button').trigger('click');

    expect((wrapper.vm as any).message).toBe('');
    expect(wrapper.emitted('sendMessage')).toBeFalsy();
  });
});
