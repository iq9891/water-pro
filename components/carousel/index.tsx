import { App, Plugin } from 'vue';
import Carousel from './carousel';
import CarouselImg from './carousel-img';

Carousel.Img = CarouselImg;

/* istanbul ignore next */
Carousel.install = function(app: App) {
  app.component(Carousel.name, Carousel);
  app.component(Carousel.Img.name, Carousel.Img);
  return app;
};

export default Carousel as typeof Carousel &
  Plugin & {
    readonly Img: typeof CarouselImg;
  };
