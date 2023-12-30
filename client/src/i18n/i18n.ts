import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export type Language = 'he' | 'en'

export type Translation = {
  header: {
    title: string
    sub_title: string
  }
  student: {
    greeting: string
    edit_details: string
    insert_details: string
    details: string
  }
  fields: {
    id: string
    id_error: string
    full_name: string
    full_name_error: string
    phone: string
    phone_error: string
    dorm: string
    dorm_error: string
    building: string
    building_error: string
    floor: string
    floor_error: string
    apartment: string
    apartment_error: string
    side: string
  }
  category: {
    visit: string
    sleep: string
    maintenance: string
    pick: string
  }
  maintenance: {
    description: string
    chars_left: string
  }
  button: {
    open_request: string
    cancel: string
    save: string
  }
  guest: {
    add: string
    details: string
  }
}

export const resources: Record<Language, { translation: Translation }> = {
  he: {
    translation: {
      header: {
        title: 'האורח האוטומטי',
        sub_title: 'של מעונות אוניברסיטת תל אביב',
      },
      student: {
        greeting: 'שלום, {{name}}',
        details: 'פרטי סטודנט',
        edit_details: 'עריכת פרטי סטודנט',
        insert_details: 'הזנת פרטי סטודנט',
      },
      fields: {
        id: 'ת.ז',
        id_error: 'יש להזין מספר ת.ז',
        full_name: 'שם מלא',
        full_name_error: 'יש להזין שם מלא',
        phone: 'טלפון',
        phone_error: 'יש להזין מספר טלפון',
        dorm: 'מעון',
        dorm_error: 'יש לבחור מעון',
        building: 'בניין',
        building_error: 'יש לבחור בניין',
        floor: 'קומה',
        floor_error: 'יש לבחור קומה',
        apartment: 'מספר דירה',
        apartment_error: 'יש לבחור מספר דירה',
        side: 'צד',
      },
      category: {
        visit: 'פניית ביקור',
        sleep: 'פניית לינה',
        maintenance: 'פניית תחזוקה',
        pick: 'יש לבחור סוג פנייה',
      },
      maintenance: {
        description: 'תיאור הפנייה',
        chars_left: 'נותרו {{chars}} תווים',
      },
      button: {
        open_request: 'פתיחת פנייה',
        cancel: 'ביטול',
        save: 'שמירה',
      },
      guest: {
        add: 'הוספת אורח',
        details: 'פרטי אורח',
      },
    },
  },
  en: {
    translation: {
      header: {
        title: 'Auto Guest',
        sub_title: 'Of the TAU Dorms',
      },
      student: {
        greeting: 'hello, {{name}}',
        details: 'Student Details',
        edit_details: 'Edit Student Details',
        insert_details: 'Insert Student Details',
      },
      fields: {
        id: 'ID',
        id_error: 'ID required',
        full_name: 'Full Name',
        full_name_error: 'Full Name required',
        phone: 'Phone',
        phone_error: 'Phone required',
        dorm: 'Dormitory',
        dorm_error: 'Dormitory required',
        building: 'Building',
        building_error: 'Building required',
        floor: 'Floor',
        floor_error: 'Floor required',
        apartment: 'Apartment',
        apartment_error: 'Apartment required',
        side: 'Side',
      },
      category: {
        visit: 'Visitors Permits',
        sleep: 'Accommodation Permits',
        maintenance: 'Maintenance issues',
        pick: 'Please pick request type',
      },
      maintenance: {
        description: 'Call description',
        chars_left: '{{chars}} characters remaining',
      },
      button: {
        open_request: 'Open request',
        cancel: 'Cancel',
        save: 'Save',
      },
      guest: {
        add: 'Add guest',
        details: 'Guest Details',
      },
    },
  },
}

i18next.use(initReactI18next).init({
  lng: localStorage.getItem('lang') || 'he',
  resources,
})
