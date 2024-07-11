export function checkTeraBoxUrl(url: string) {
  const patterns = [
    /ww\.mirrobox\.com/,
    /www\.nephobox\.com/,
    /freeterabox\.com/,
    /www\.freeterabox\.com/,
    /1024tera\.com/,
    /4funbox\.co/,
    /www\.4funbox\.com/,
    /mirrobox\.com/,
    /nephobox\.com/,
    /terabox\.app/,
    /terabox\.com/,
    /www\.terabox\.ap/,
    /terabox\.fun/,
    /www\.terabox\.com/,
    /www\.1024tera\.co/,
    /www\.momerybox\.com/,
    /teraboxapp\.com/,
    /momerybox\.com/,
    /tibibox\.com/,
    /www\.tibibox\.com/,
    /www\.teraboxapp\.com/,
  ];

  for (const pattern of patterns) {
    if (pattern.test(url)) {
      return true;
    }
  }

  return false;
}

export function checkYouTubeUrl(url: string) {
  const pattern =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/;
  return pattern.test(url);
}

export function checkInstaUrl(url: string) {
  const pattern = /^(https?\:\/\/)?(www\.)?instagram\.com\/.+$/;
  return pattern.test(url);
}

export function checkFacebookUrl(url: string) {
  const patterns = [
    /^(https?\:\/\/)?(www\.)?fb\.watch\/.+$/,
    /^(https?\:\/\/)?(www\.)?facebook\.com\/.+$/,
  ];
  for (const pattern of patterns) {
    if (pattern.test(url)) {
      return true;
    }
  }
  return false;
}
