let pacman = document.querySelector('#pacman')
let blinky = document.querySelector('#blinky')
let pinky = document.querySelector('#pinky')
let inky = document.querySelector('#inky')
let clyde = document.querySelector('#clyde')

let mode_seq
let mode_time_stamp
let mode_elapsed_time
let mode_elapsed_time_updated
let house_stay 
let house_time_stamp
let house_elapsed_time 
let power_time_stamp
let power_elapsed_time
let ghosts = [blinky,pinky,inky,clyde]
let kill_pause
let consecutive_kills

let power_outerTimeout
let power_innerTimeout
let modeInterval
let houseInterval
let pacmanInterval
let blinkyInterval
let pinkyInterval
let inkyInterval
let clydeInterval

let ghostIntervals = (index)=>{
    let intervals = [blinkyInterval, pinkyInterval, inkyInterval, clydeInterval]
    return intervals[index]
}

let move_blinky = (interval)=>{
    blinkyInterval = setInterval(()=>{
        move_ghost(blinky)
    },interval)
}

let move_pinky = (interval)=>{
    pinkyInterval = setInterval(()=>{
        move_ghost(pinky)
    },interval)
}

let move_inky = (interval)=>{
    inkyInterval = setInterval(()=>{
        move_ghost(inky)
    },interval)
}

let move_clyde = (interval)=>{
    clydeInterval = setInterval(()=>{
        move_ghost(clyde)
    },interval)
}

let move_ghosts = [move_blinky, move_pinky, move_inky, move_clyde]