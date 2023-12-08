const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  
  const timeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  
  const dateFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);
  const timeFormat = new Intl.DateTimeFormat("en-GB", timeFormatOptions);

  class DateTime {

     constructor(date,time) {
        this.date = date;
        this.time = time;
        this.interval = null;
     }

     startClock(){
        
          this.interval = setInterval(() =>{

            this.today = new Date();
            
            this.date.innerHTML = dateFormat.format(this.today);
            this.time.innerHTML = timeFormat.format(this.today);

         }, 1000)
     }
  }
  








   


