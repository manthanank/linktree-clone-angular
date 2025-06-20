export const APP_CONSTANTS = {
  DATA_URL: 'data.json',
  PROFILE_IMAGE_SIZE: {
    WIDTH: 96,
    HEIGHT: 96
  },
  LINK_ICON_SIZE: {
    WIDTH: 40,
    HEIGHT: 40
  },
  SHARE_ICON_SIZE: {
    WIDTH: 18,
    HEIGHT: 18
  }
} as const;

export const SHARE_MESSAGES = {
  PROFILE_TITLE: (name: string) => `${name}'s Links`,
  PROFILE_TEXT: (name: string) => `Check out ${name}'s links`,
  LINK_TITLE: 'Site Link',
  LINK_TEXT: 'Check out this link'
} as const;
