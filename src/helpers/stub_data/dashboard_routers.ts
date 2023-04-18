export const routers = [
  {
    id: 1,
    router: {
      name: 'Router One',
      icon: require('../../assets/inactive_router.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 2,
    router: {
      name: 'Router Two',
      icon: require('../../assets/active_router.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 3,
    router: {
      name: 'Router Three',
      icon: require('../../assets/transit_router.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 4,
    router: {
      name: 'Router Four',
      icon: require('../../assets/inactive_router.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
];

export const routerTableHeaders = [
  'IMEI',
  'OS VERSION ID',
  'MODEL',
  'LAST CONTACT IP',
  'ALLOCATION DATE',
  'ACTION',
];


export const routerTableIcons = [
  require('../../assets/view.png'),
  require('../../assets/edit.png'),
  require('../../assets/delete.png'),
];



/// Voucher Data
export const voucherTableHeaders = [
  'Time Valid (minutes)',
  'Source',
  'Created',
  'QR code',
];
export const voucherTableIcons = [
  require('../../assets/Scan-icon.png'),
];
export const vouchers = [
  {
    id: 1,
    router: {
      name: 'Router One',
      icon: require('../../assets/voucher.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 2,
    router: {
      name: 'Router Two',
      icon: require('../../assets/voucher-green.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 3,
    router: {
      name: 'Router Three',
      icon: require('../../assets/voucher-dark-yellow.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 4,
    router: {
      name: 'Router Four',
      icon: require('../../assets/voucher.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '89944',
    lastContactIp: {
      ipAddress: '123.122.1123.44',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
];



/// Captive Portal Data
export const captiveTableHeaders = [
  'Create at',
  'Last Updated',
  'Actions'
];
export const captiveTableIcons = [
  {
    type: 'img',
    content: require('../../assets/share-compress.png')
  },
  {
    type: 'img',
    content: require('../../assets/edit.png')
  },
  {
    type: 'img',
    content: require('../../assets/delete.png')
  }
  ,
  {
    type: 'text',
    content: 'Customize'
  }
];
export const captive = [
  {
    id: 1,
    router: {
      name: 'Router One',
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },

    lastContactIp: {
      ipAddress: '2022-10-17T12:41:33.556627+03:00',
    },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
  },
  {
    id: 2,
    router: {
      name: 'Router Two',
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },

    lastContactIp: {
      ipAddress: '2022-10-17T12:41:33.556627+03:00',
    },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
  },
  {
    id: 3,
    router: {
      name: 'Router Three',
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },

    lastContactIp: {
      ipAddress: '2022-10-17T12:41:33.556627+03:00',

    },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
  },
  {
    id: 4,
    router: {
      name: 'Router Four',
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },

    lastContactIp: {
      ipAddress: '2022-10-17T12:41:33.556627+03:00',

    },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
  },
 
];


export const feedbackTableHeaders = [
  'Rating',
  'Comment',
  'Date',
];

/// File Media Data
export const fileMediaTableHeaders = [
  'File Type',
  'Status',
  'Download',
  'Action'
];
export const fileMediaTableIcons = [
  {
    type: 'img',
    content: require('../../assets/red-delete.png')
  },
];
export const fileMedia = [
  {
    id: 1,
    router: {
      name: 'Restaurant 1 Realm ',
      icon: require('../../assets/video.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: 'Video',
    lastContactIp: {
      ipAddress: 'Enabled',
    },
  

  },
  {
    id: 2,
    router: {
      name: 'Restaurant 2 Realm  ',
      icon: require('../../assets/image.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: 'PNG',
    lastContactIp: {
      ipAddress: 'Disabled',
    },
   
  },
  {
    id: 3,
    router: {
      name: 'Restaurant 3 Realm  ',
      icon: require('../../assets/document.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: 'DOCX',
    lastContactIp: {
      ipAddress: 'Disabled',
    },
   
  },
  {
    id: 4,
    router: {
      name: 'Restaurant 4 Realm  ',
      icon: require('../../assets/file.png'),
      number: '490054334',
    },
    imei: '758494933023002',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: 'PDF',
    lastContactIp: {
      ipAddress: 'Disabled',
    },
    
  },
];





/// support Tickets Data
export const supportTableHeaders = [
  'Message',
  'Created',
  'Status',
  'ACTION',
];
export const supportTableIcons = [
  require('../../assets/red-delete.png'),
];
export const support = [
  {
    id: 1,
    router: {
      name: 'Restaurant 1 Realm  ',
      icon: require('../../assets/voucher.png'),
      number: '490054334',
    },
    imei: 'Enabled',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
    lastContactIp: {
      ipAddress: 'Video',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 2,
    router: {
      name: 'Restaurant 2 Realm  ',
      icon: require('../../assets/voucher-green.png'),
      number: '490054334',
    },
    imei: 'Enabled',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
    lastContactIp: {
      ipAddress: 'PNG ',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 3,
    router: {
      name: 'Restaurant 3 Realm  ',
      icon: require('../../assets/voucher-dark-yellow.png'),
      number: '490054334',
    },
    imei: 'Disabled',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
    lastContactIp: {
      ipAddress: 'DOCX',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
  {
    id: 4,
    router: {
      name: 'Restaurant 4 Realm  ',
      icon: require('../../assets/voucher.png'),
      number: '490054334',
    },
    imei: 'Disabled',
    osVersion: { name: 'Linux/redhat', number: '12.56' },
    modelNumber: '2022-10-17T12:41:33.556627+03:00',
    lastContactIp: {
      ipAddress: 'PDF',
      details: 'IPV4/APV6',
    },
    date: Date.now(),
  },
];










export const dashboardHeadericon = {
  dashboard:require('../../assets/dashboard.svg'),
  accountIcon: require('../../assets/account-icon.svg'),
  fileIcon:require('../../assets/all-media-icon.svg'),
  voucher:require('../../assets/voucher-sidemenu.svg'),
  router:require('../../assets/router.svg'),
  captiveportal:require('../../assets/captive-portal-icon.svg'),
  SupportTickets:require('../../assets/support-tickets.svg'),
  Billing:require('../../assets/billing.svg'),
  feedback:require('../../assets/feedback.svg'),
  }; 
