// @ts-nocheck

import {
  BsYoutube,
  BsGoogle,
  BsInstagram,
  BsWhatsapp,
  BsSnapchat,
  BsDribbble,
  BsPinterest,
  BsLinkedin,
  BsTwitter,
  BsDiscord,
  BsYelp,
  BsQuora,
  BsVimeo,
  BsSteam,
  BsBehance,
  BsDropbox,
  BsGithub,
} from "react-icons/bs";
import {
  AiFillInstagram,
  AiFillDribbbleCircle,
  AiFillMediumSquare,
} from "react-icons/ai";
import {
  ImYoutube2,
  ImLastfm2,
  ImLastfm,
  ImTwitch,
  ImTumblr2,
  ImFlickr2,
  ImFlickr3,
  ImDeviantart,
  ImSteam,
  ImBehance2,
} from "react-icons/im";
import {
  FaSnapchatGhost,
  FaTiktok,
  FaFacebookF,
  FaFacebook,
  FaReddit,
  FaPinterestP,
  FaTelegramPlane,
  FaTumblr,
  FaMediumM,
  FaGoodreadsG,
  FaGoodreads,
  FaVimeoSquare,
  FaLinkedinIn,
  FaViber,
  FaShopify,
} from "react-icons/fa";
import {
  SlSocialGoogle,
  SlSocialSpotify,
  SlSocialVkontakte,
} from "react-icons/sl";
import {
  SiSpotify,
  SiTelegram,
  SiMyspace,
  SiShazam,
  SiSellfy,
} from "react-icons/si";
import { RiWhatsappFill, RiWechatFill } from "react-icons/ri";
import {
  TbBrandWechat,
  TbBrandReddit,
  TbBrandDeviantart,
  TbBrandShazam,
} from "react-icons/tb";
import {
  TiSocialLastFm,
  TiSocialTumbler,
  TiSocialGithub,
  TiSocialVimeo,
} from "react-icons/ti";
import { RxDiscordLogo, RxTwitterLogo } from "react-icons/rx";

export const mediaIcons = [
  <BsYoutube />,
  <ImYoutube2 />,
  <SlSocialSpotify />,
  <SiSpotify />,
  <BsGoogle />,
  <SlSocialGoogle />,
  <BsSnapchat />,
  <FaSnapchatGhost />,
  <AiFillInstagram />,
  <BsInstagram />,
  <RiWhatsappFill />,
  <BsWhatsapp />,
  <FaTiktok />,
  <BsDribbble />,
  <AiFillDribbbleCircle />,
  <FaFacebookF />,
  <FaFacebook />,
  <ImLastfm2 />,
  <ImLastfm />,
  <TbBrandWechat />,
  <RiWechatFill />,
  <FaReddit />,
  <TbBrandReddit />,
  <BsPinterest />,
  <FaPinterestP />,
  <FaTelegramPlane />,
  <SiTelegram />,
  <FaLinkedinIn />,
  <BsLinkedin />,
  <FaViber />,
  <ImTwitch />,
  <FaTumblr />,
  <ImTumblr2 />,
  <BsTwitter />,
  <RxTwitterLogo />,
  <FaMediumM />,
  <AiFillMediumSquare />,
  <SlSocialVkontakte />,
  <BsDiscord />,
  <RxDiscordLogo />,
  <ImFlickr2 />,
  <ImFlickr3 />,
  <SiMyspace />,
  <TbBrandDeviantart />,
  <ImDeviantart />,
  <BsYelp />,
  <BsQuora />,
  <FaGoodreadsG />,
  <FaGoodreads />,
  <BsVimeo />,
  <FaVimeoSquare />,
  <SiShazam />,
  <TbBrandShazam />,
  <SiSellfy />,
  <BsGithub />,
  <BsDropbox />,
  <BsBehance />,
  <ImBehance2 />,
  <ImSteam />,
  <BsSteam />,
  <FaShopify />,
];

const getIcons = () => {
  return Object.entries(mediaIcons).map(([_, icon]) => {
    return { icon: icon.type, name: icon.type.name };
  });
};

export const icons = getIcons();
