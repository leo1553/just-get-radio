export type SearchArtistsResponse = {
  artists: Artist[];
};

export type Artist = {
  idArtist: string;
  strArtist: string;
  strArtistStripped: any;
  strArtistAlternate: string;
  strLabel: string;
  idLabel: string;
  intFormedYear: string;
  intBornYear: string;
  intDiedYear: any;
  strDisbanded: any;
  strStyle: string;
  strGenre: string;
  strMood: string;
  strWebsite: string;
  strFacebook: string;
  strTwitter: string;
  strBiographyEN: string;
  strBiographyDE: string;
  strBiographyFR: string;
  strBiographyCN: string;
  strBiographyIT: string;
  strBiographyJP: string;
  strBiographyRU: string;
  strBiographyES: string;
  strBiographyPT: string;
  strBiographySE: string;
  strBiographyNL: string;
  strBiographyHU: string;
  strBiographyNO: string;
  strBiographyIL: string;
  strBiographyPL: string;
  strGender: string;
  intMembers: string;
  strCountry: string;
  strCountryCode: string;
  strArtistThumb: string;
  strArtistLogo: string;
  strArtistCutout: string;
  strArtistClearart: string;
  strArtistWideThumb: string;
  strArtistFanart: string;
  strArtistFanart2: string;
  strArtistFanart3: string;
  strArtistFanart4: string;
  strArtistBanner: string;
  strMusicBrainzID: string;
  strISNIcode: any;
  strLastFMChart: string;
  strLocked: string;
};

export type SearchArtistMusicVideos = {
  mvids: Mvid[];
};

export type Mvid = {
  idTrack: string;
  idAlbum: string;
  strArtist: string;
  strTrack: string;
  intDuration: string;
  strTrackThumb?: string;
  strMusicVid: string;
  strDescriptionEN?: string;
  strMusicBrainzArtistID: string;
  strMusicBrainzAlbumID: string;
  strMusicBrainzID: string;
};
