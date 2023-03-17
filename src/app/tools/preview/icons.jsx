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

export const mediaIcons = {
  youtube: [<BsYoutube />, <ImYoutube2 />],
  spotify: [<SlSocialSpotify />, <SiSpotify />],
  google: [<BsGoogle />, <SlSocialGoogle />],
  snapchat: [<BsSnapchat />, <FaSnapchatGhost />],
  instagram: [<AiFillInstagram />, <BsInstagram />],
  whatsapp: [<RiWhatsappFill />, <BsWhatsapp />],
  tiktok: [<FaTiktok />],
  dribbble: [<BsDribbble />, <AiFillDribbbleCircle />],
  facebook: [<FaFacebookF />, <FaFacebook />],
  lastfm: [<ImLastfm2 />, <ImLastfm />],
  wechat: [<TbBrandWechat />, <RiWechatFill />],
  reddit: [<FaReddit />, <TbBrandReddit />],
  pinterest: [<BsPinterest />, <FaPinterestP />],
  telegram: [<FaTelegramPlane />, <SiTelegram />],
  linkedin: [<FaLinkedinIn />, <BsLinkedin />],
  viber: [<FaViber />],
  twitch: [<ImTwitch />],
  tumblr: [<FaTumblr />, <ImTumblr2 />],
  twitter: [<BsTwitter />, <RxTwitterLogo />],
  medium: [<FaMediumM />, <AiFillMediumSquare />],
  vk: [<SlSocialVkontakte />],
  discord: [<BsDiscord />, <RxDiscordLogo />],
  flickr: [<ImFlickr2 />, <ImFlickr3 />],
  myspace: [<SiMyspace />],
  devianart: [<TbBrandDeviantart />, <ImDeviantart />],
  yelp: [<BsYelp />],
  quora: [<BsQuora />],
  goodreads: [<FaGoodreadsG />, <FaGoodreads />],
  vimeo: [<BsVimeo />, <FaVimeoSquare />],
  shazam: [<SiShazam />, <TbBrandShazam />],
  sellfy: [<SiSellfy />],
  github: [<BsGithub />],
  dropbox: [<BsDropbox />],
  behance: [<BsBehance />, <ImBehance2 />],
  steam: [<ImSteam />, <BsSteam />],
  shopify: [<FaShopify />],
};

const getIcons = () => {
  return Object.entries(mediaIcons).map(([key, value]) => {
    return { icon: value[value.length - 1].type, name: key };
  });
};

export const icons = getIcons();
