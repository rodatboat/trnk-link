import React, { lazy, Suspense, useEffect, useState } from "react";
import { mediaIcons } from "./icons";

export default function SocialIconElement({ iconName, fontSize=20 }) {
  const iconExists = mediaIcons.filter((i) => i.type.name === iconName);
  const IconElem = iconExists.length > 0 ? iconExists[0].type : <></>;

  return <IconElem fontSize={fontSize} />;
}
