export function InitializeTimer() //TODO: This is not in use. Should this be removed?
{
    function getTimeRemaining(endTime) 
    {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        const obj = 
        {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };

        return obj;
    }

    function initializeClock(id, endTime) 
    {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector(".days");
        var hoursSpan = clock.querySelector(".hours");
        var minutesSpan = clock.querySelector(".minutes");
        var secondsSpan = clock.querySelector(".seconds");

        function updateClock() 
        {
            var t = getTimeRemaining(endTime);
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        updateClock();
        var timeInterval = setInterval(updateClock, 1000);
    }
    
    //var deadline = new Date(Date.parse(date) + 18 * 24 * 60 * 60 * 1000);
    var deadline = new Date("2020-09-01T00:00:00Z");
    //var deadline = new Date(Date.parse(new Date()) + 300 * 24 * 60 * 60 * 1000);
    initializeClock("clockdiv", deadline);//TODO: Send the ID as a parameter inside. It should not be hard coded in the module.
}