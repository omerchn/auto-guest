export const FORM_NAMES = {
  viewState: '__VIEWSTATE',
  eventValidation: '__EVENTVALIDATION',
  fullName: 'FullName',
  phone: 'Phone',
  dorm: 'DormDropDown',
  building: 'DropDownBuilding',
  floor: 'DropDownFloor',
  unit: 'DropDownUnit',
  side: 'DropDownSide',
  category: 'DropDownFaultCategory',
  id: 'ID_TB',
  entranceDate: 'EntranceDate_TB',
  leaveDate: 'LeaveDate_TB',
  guestId: 'GuestID_TB',
  guestFullName: 'GuestName_TB',
  guestPhone: 'GuestPhone_TB',
  captchaAnswer: 'CaptchaCodeTextBox',
  captchaSubmitButton: 'Button1',
  maintenanceText: 'ProblemDesc',
}

export const CATEGORIES = {
  guestVisit: 'פניות בנושא מבקרים',
  guestSleep: 'פניות בנושא לינה',
  maintenance: 'פניות בנושאי תחזוקה',
} as const

export const DOCUMENT_URL = 'https://meonot.shikunbinui.com'

export const DOCUMENT_COOKIES = 'AspxAutoDetectCookieSupport=1; Path=/;'

export const SUCCESS_MESSAGE_SELECTOR = '#doneProgras'

export const FAILURE_MESSAGE_SELECTOR = '#lblResult'

export const MAINTENANCE_FAILURE_MESSAGE_SELECTOR = '#ProblemDescValidator'

export const USER_ERRORS = {
  serverError: 'משהו נכשל',
  pageClosed: 'עמוד נסגר אוטומטית, יש לנסות שוב',
}

export const PAGE_AUTO_CLOSE_TIME_MS = 60 * 1000
