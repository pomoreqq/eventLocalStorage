class Event {
    constructor(eventName, eventDescription = '', eventDate, eventLocalization = '', eventPriority = null) {
        if (typeof eventName === 'string' && eventName.length > 0 ) {
            this.eventName = eventName
        } else {
            throw new Error('eventName must be a string')
        }
        if (typeof eventDescription === 'string' ) {
            this.eventDescription = eventDescription
        } else {
            throw new Error('Description must be a string')
        }

        // if (this.isValidate(eventDate)) {
        // this.eventDate = eventDate
        //} else {
        // throw new Error('Event date must be a valid date in the format YYYY-MM-DD');
        //} 

        const dataRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (dataRegex.test(eventDate) ) {
            this.eventDate = eventDate
        } else {
            throw new Error('Date must be in format YYYY-MM-DD')
        }
        if (typeof eventLocalization === 'string' ) {
            this.eventLocalization = eventLocalization
        } else {
            throw new Error('Localization must be a string')
        }
        if (typeof eventPriority === 'number' && (eventPriority > 0 && eventPriority <= 5) ) {
            this.eventPriority = eventPriority
        } else {
            throw new Error('Priority must be number')
        }
    }

    // isValidateData(dataString) {
    //     const date = new Date(dataString)
    //     return !isNaN(date.getTime())
    // }

}



class EventList{
    constructor() {
        this.list = [];
        this.loadFromLocalStorage()
    }


    addEvent(event) {
        this.list.push(event)
        this.saveLocalStorage()
    }

    deleteEvent(id) {
       this.list = this.list.filter((_,index )=> index !== id)
       this.saveLocalStorage()
    }


    editEvent(id,name,description,date,localization,priority) {

        const event = this.list[id]

        if (!event) {
            throw new Error('Event not found');
        }
    
        
        if (name !== undefined) {
            event.eventName = name;
        }
        
        if (description !== undefined) {
            event.eventDescription = description;
        }
        
        if (date !== undefined) {
            event.eventDate = date;
        }
        
        if (localization !== undefined) {
            event.eventLocalization = localization;
        }
        
        if (priority !== undefined) {
            if (priority >= 1 && priority <= 5) {
                event.eventPriority = priority;
            } else {
                throw new Error('Priority must be a number between 1 and 5');
            }
        }
        this.saveLocalStorage()
    }



    findEventByName(name) {
        let find = this.list.find(item => item.eventName === name)
        
        return find;
    }

    saveLocalStorage() {
        localStorage.setItem('events', JSON.stringify(this.list))
    }

    loadFromLocalStorage() {
        const events = localStorage.getItem('events')

        if(events) {
            this.list =  JSON.parse(events).map(event=> {
                return new Event(
                    event.eventName,
                    event.eventDescription,
                    event.eventDate,
                    event.eventLocalization,
                    event.eventPriority,
                )
            })
        }
    }

}