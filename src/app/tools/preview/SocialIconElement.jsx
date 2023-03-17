import React, {lazy, Suspense, useEffect, useState } from 'react';
import { mediaIcons } from './icons';

export default function SocialIconElement({iconName}) {
    const IconElem = mediaIcons.filter((i)=> i.type.name === iconName)[0].type;
  return (
    <IconElem />
  )
}
