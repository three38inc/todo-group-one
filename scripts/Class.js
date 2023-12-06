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

  class DateTime{
     constructor(){
        this.interval = null;
     }

     startClock(date,time){
        
          this.interval = setInterval(() =>{

            this.today = new Date();
            
            date.innerHTML = dateFormat.format(this.today);
            time.innerHTML = timeFormat.format(this.today);

            }, 1000)
     }
  }
  
 
