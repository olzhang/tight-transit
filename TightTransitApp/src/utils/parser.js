export default function ParseRoutes(response, routeList) {
  // console.log(response.routes.length);
  // for (var i = 0; i < response.routes.length; i++) {
    // var userRoutes = [];
    response.routes.forEach((e, i) => {
      let currRoute = [];
      // userRoutes.push(currRoute);
      routeList.push(currRoute);
      e.legs.forEach((leg, i) => {

        let currLeg = {};
        currRoute.push(currLeg);
        currLeg.steps = [];

        currLeg.duration = leg.duration.value;
        currLeg.departureTime = leg.departure_time.value;
        currLeg.arrivalTime = leg.arrival_time.value;

        leg.steps.forEach((step, i) => {

          let currStep = {};
          if (step.travel_mode === "TRANSIT") {
            currStep.mode = "TRANSIT";
            currStep.name = step.transit_details.line.name;
            currStep.departureStop = {};
            currStep.departureStop.lat = step.transit_details.departure_stop.location.lat;
            currStep.departureStop.lng = step.transit_details.departure_stop.location.lng;
            currStep.departureStop.name = step.transit_details.departure_stop.name;
            currStep.departureTime = step.transit_details.departure_time.value;
            currStep.arrivalStop = {}
            currStep.arrivalStop.lat = step.transit_details.arrival_stop.location.lat;
            currStep.arrivalStop.lng = step.transit_details.arrival_stop.location.lng;
            currStep.arrivalStop.name = step.transit_details.arrival_stop.name;
            currStep.arrivalTime = step.transit_details.arrival_time.value;
            currStep.headSign = step.transit_details.headsign;
            currStep.routeNum = step.transit_details.line.short_name;
            currLeg.steps.push(currStep);
          } else if (step.travel_mode === "WALKING") {
            currStep.mode = "WALKING";
            currStep.walkingSteps = [];
            step.steps.forEach((walkingStep, i) => {
              currWalkingStep = {};
              currWalkingStep.distance = walkingStep.distance;
              currWalkingStep.duration = walkingStep.duration.value;
              currWalkingStep.instructions = walkingStep.instructions;
              currWalkingStep.fromLocn = {};
              currWalkingStep.fromLocn.lat = walkingStep.start_location.lat;
              currWalkingStep.fromLocn.lng = walkingStep.start_location.lng;
              currWalkingStep.toLocn = {};
              currWalkingStep.toLocn.lat = walkingStep.end_location.lat;
              currWalkingStep.toLocn.lng = walkingStep.end_location.lng;
              currStep.walkingSteps.push(currWalkingStep);
            })
            currLeg.steps.push(currStep);
          }

        });
      });
    });
    // routeList.push(userRoutes);
  // }
  // console.log(routeList.length);
}

export function isSameLeg(leg1, leg2)
{
  // base same leg on same bus route, same arrival/depart time for each route
  var leg1TransitSteps = [];
  var leg2TransitSteps = [];

  leg1.steps.forEach((step, index) => {
    if (step.mode == "TRANSIT"){
      leg1TransitSteps.push({
        departureTime: step.departureTime,
        arrivalTime: step.arrivalTime,
        routeNum: step.routeNum,
      });
    }
  });
  leg2.steps.forEach((step, index) => {
    if (step.mode == "TRANSIT"){
      leg2TransitSteps.push({
        departureTime: step.departureTime,
        arrivalTime: step.arrivalTime,
        routeNum: step.routeNum,
      });
    }
  });

  if (leg1TransitSteps.length !== leg2TransitSteps.length) return false;

  for (var i=0; i<leg1TransitSteps.length; i++) {
    if (JSON.stringify(leg1TransitSteps[i]) != JSON.stringify(leg2TransitSteps[i])){
      return false;
    }
  }

  return true;
}

export function isSameRoute(route1, route2) {
  if (route1.length != route2.length) return false;
  for (var i = 0; i < route1.length; i++) {
    if (!isSameLeg(route1[i], route2[i])){
      return false;
    }
  }
  return true;
}

export function sumLegTimes(route){
  var retVal = 0;
  route.forEach((leg, index) => {
    retVal += leg.duration;
  });
  return retVal;
}

export function getRouteStepsAsString(route){
  var outString = "";
  for (var i = 0; i < route.length; i++){
    for (var j = 0; j < route[i].steps.length; j++){
      if (route[i].steps[j].mode == "TRANSIT"){
        outString = outString + route[i].steps[j].routeNum + "";
      } else if (route[i].steps[j].mode == "WALKING"){
        outString = outString + "W";
      } else { //error
        outString = outString + "E"
      }
      if (i < route.length-1 || j < route[i].steps.length-1){
        outString = outString + " > "
      }
    }
  }
  return outString;
}

export function getTransitStartTime(route){
  for (var i = 0; i < route.length; i++){
    for (var j = 0; j < route[i].steps.length; j++){
      if (route[i].steps[j].mode == "TRANSIT"){
        return route[i].steps[j].departureTime;
      }
    }
  }
  return -1;
}

export function getTransitEndTime(route) {
  for (var i = route.length-1; i >= 0; i--){
    for (var j = route[i].steps.length-1; j >=0; j--){
      if (route[i].steps[j].mode == "TRANSIT"){
        return route[i].steps[j].arrivalTime;
      }
    }
  }
  return -1;
}

export function getFirstLegStartTime(route) {
  for (var i = 0; i < route.length; i++) {
    return route[i].departureTime;
  }
  return -1;
}

export function getLastLegEndTime(route) {
  var retStart = -1;
  for (var i = route.length-1; i >=0; i--){
    return route[i].arrivalTime;
  }
  return -1;
}

export function outputStrTimeRange (startEpoch, endEpoch) {
  var momentEnd = moment(endEpoch);
  var momentDiff = momentEnd.diff(moment(startEpoch));
  var momentDuration = moment.duration(momentDiff);
  var stringRange = Math.floor(momentDuration.asHours()) + moment.utc(momentDiff).format(":mm:ss");
  return stringRange;
}
