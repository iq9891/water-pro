import { mount } from '@vue/test-utils';
import * as Vue from 'vue';
import { asyncExpect } from '@/tests/utils';
import Anchor from '..';

const { Link } = Anchor;

let idCounter = 0;
const getHashUrl = () => `Anchor-API-${idCounter++}`;

describe('Anchor Render', () => {
  it('Anchor render perfectly', (done) => {
    const hash = getHashUrl();
    const wrapper = mount(
      {
        render() {
          return (
            <Anchor ref="anchor">
              <Link href={`#${hash}`} title={hash} />
            </Anchor>
          );
        },
      },
      { sync: false },
    );
    Vue.nextTick(() => {
      wrapper.find(`a[href="#${hash}`).trigger('click');
      wrapper.vm.$refs.anchor.handleScroll();
      setTimeout(() => {
        expect(wrapper.vm.$refs.anchor.$data.activeLink).not.toBe(null);
        done();
      }, 1000);
    });
  });

  it('Anchor render perfectly for complete href - click', (done) => {
    const wrapper = mount(
      {
        render() {
          return (
            <Anchor ref="anchor">
              <Link href="http://www.example.com/#API" title="API" />
            </Anchor>
          );
        },
      },
      { sync: false },
    );
    Vue.nextTick(() => {
      wrapper.find('a[href="http://www.example.com/#API"]').trigger('click');
      expect(wrapper.vm.$refs.anchor.$data.activeLink).toBe('http://www.example.com/#API');
      done();
    });
  });

  it('Anchor render perfectly for complete href - scroll', (done) => {
    const wrapper = mount(
      {
        render() {
          return (
            <div>
              <div id="API">Hello</div>
              <Anchor ref="anchor">
                <Link href="http://www.example.com/#API" title="API" />
              </Anchor>
            </div>
          );
        },
      },
      { sync: false, attachTo: 'body' },
    );
    Vue.nextTick(() => {
      wrapper.vm.$refs.anchor.handleScroll();
      expect(wrapper.vm.$refs.anchor.$data.activeLink).toBe('http://www.example.com/#API');
      done();
    });
  });

  it('Anchor render perfectly for complete href - scrollTo', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const wrapper = mount(
      {
        render() {
          return (
            <div>
              <div id="API">Hello</div>
              <Anchor ref="anchor">
                <Link href="##API" title="API" />
              </Anchor>
            </div>
          );
        },
      },
      { sync: false, attachTo: 'body' },
    );
    await asyncExpect(() => {
      wrapper.vm.$refs.anchor.handleScrollTo('##API');
      expect(wrapper.vm.$refs.anchor.$data.activeLink).toBe('##API');
      expect(scrollToSpy).not.toHaveBeenCalled();
    });
    await asyncExpect(() => {
      expect(scrollToSpy).toHaveBeenCalled();
    }, 1000);
  });

  it('should remove listener when unmount', async () => {
    const wrapper = mount(
      {
        render() {
          return (
            <Anchor ref="anchor">
              <Link href="#API" title="API" />
            </Anchor>
          );
        },
      },
      { sync: false, attachTo: 'body' },
    );
    await asyncExpect(() => {
      const removeListenerSpy = jest.spyOn(wrapper.vm.$refs.anchor.scrollEvent, 'remove');
      wrapper.unmount();
      expect(removeListenerSpy).toHaveBeenCalled();
    });
  });

  it('should unregister link when unmount children', async () => {
    const wrapper = mount(
      {
        props: {
          showLink: {
            type: Boolean,
            default: true,
          },
        },
        render() {
          return (
            <Anchor ref="anchor">{this.showLink ? <Link href="#API" title="API" /> : null}</Anchor>
          );
        },
      },
      { sync: false, attachTo: 'body' },
    );
    await asyncExpect(() => {
      expect(wrapper.vm.$refs.anchor.links).toEqual(['#API']);
      wrapper.setProps({ showLink: false });
    });
    await asyncExpect(() => {
      expect(wrapper.vm.$refs.anchor.links).toEqual([]);
    });
  });

  it('should update links when link href update', async () => {
    const wrapper = mount(
      {
        props: ['href'],
        render() {
          return (
            <Anchor ref="anchor">
              <Link href={this.href} title="API" />
            </Anchor>
          );
        },
      },
      {
        sync: false,
        attachTo: 'body',
        props: {
          href: '#API',
        },
      },
    );
    await asyncExpect(() => {
      expect(wrapper.vm.$refs.anchor.links).toEqual(['#API']);
      wrapper.setProps({ href: '#API_1' });
    });
    await asyncExpect(() => {
      expect(wrapper.vm.$refs.anchor.links).toEqual(['#API_1']);
    });
  });

  it('Anchor onClick event', () => {
    let event;
    let link;
    const handleClick = (...arg) => ([event, link] = arg);

    const href = '#API';
    const title = 'API';

    const wrapper = mount({
      render() {
        return (
          <Anchor ref="anchorRef" onClick={handleClick}>
            <Link href={href} title={title} />
          </Anchor>
        );
      },
    });

    wrapper.find(`a[href="${href}"]`).trigger('click');

    wrapper.vm.$refs.anchorRef.handleScroll();
    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });
});
