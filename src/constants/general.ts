import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faHome, faInfo } from '@fortawesome/free-solid-svg-icons';

export const links = [
  {
    link: 'https://discordapp.com/users/613024264706064390',
    id: 1,
    icon: faDiscord,
  },
  {
    title: 'telegram',
    link: 'https://t.me/sekk_er',
    id: 2,
    icon: faTelegram,
  },
  {
    link: 'https://www.instagram.com/sekk_er/',
    id: 2,
    icon: faInstagram,
  },
  {
    link: 'https://twitter.com/AleksandrSekker',
    id: 3,
    icon: faTwitter,
  },
  {
    link: 'https://www.linkedin.com/in/aleksandr-sekker-521352161/',
    id: 4,
    icon: faLinkedin,
  },
  {
    link: 'github.com/AleksandrSekker',
    id: 5,
    icon: faGithub,
  },
];

export const routes = [
  { title: 'Home', link: '/', icon: faHome, id: 1 },
  { title: 'About', link: '/about', icon: faInfo, id: 2 },
];

export const keysToDisplay = [
  'id',
  'title',
  'description',
  'price',
  'discountPercentage',
  'rating',
  'stock',
  'brand',
  'category',
  'thumbnail',
  'images',
];

export const baseURL = 'https://dummyjson.com';
