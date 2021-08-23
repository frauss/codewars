function traverseTCPStates(eventList) {
  var state = "CLOSED"; // initial state, always

  for (let eventIndex = 0; eventIndex < eventList.length; eventIndex++) {
    tcpEvent = eventList[eventIndex];
    console.log(`Current state = ${state}, event = ${tcpEvent}`);
    switch (state) {
      case "CLOSED":
        if (tcpEvent == "APP_PASSIVE_OPEN") state = "LISTEN";
        else if (tcpEvent == "APP_ACTIVE_OPEN") state = "SYN_SENT";
        else return "ERROR";
        break;

      case "LISTEN":
        if (tcpEvent == "RCV_SYN") state = "SYN_RCVD";
        else if (tcpEvent == "APP_SEND") state = "SYN_SENT";
        else if (tcpEvent == "APP_CLOSE") state = "CLOSED";
        else return "ERROR";
        break;

      case "SYN_RCVD":
        if (tcpEvent == "APP_CLOSE") state = "FIN_WAIT_1";
        else if (tcpEvent == "RCV_ACK") state = "ESTABLISHED";
        else return "ERROR";
        break;

      case "SYN_SENT":
        if (tcpEvent == "RCV_SYN") state = "SYN_RCVD";
        else if (tcpEvent == "RCV_SYN_ACK") state = "ESTABLISHED";
        else if (tcpEvent == "APP_CLOSE") state = "CLOSED";
        else return "ERROR";
        break;

      case "ESTABLISHED":
        if (tcpEvent == "APP_CLOSE") state = "FIN_WAIT_1";
        else if (tcpEvent == "RCV_FIN") state = "CLOSE_WAIT";
        else return "ERROR";
        break;

      case "FIN_WAIT_1":
        if (tcpEvent == "RCV_FIN") state = "CLOSING";
        else if (tcpEvent == "RCV_FIN_ACK") state = "TIME_WAIT";
        else if (tcpEvent == "RCV_ACK") state = "FIN_WAIT_2";
        else return "ERROR";
        break;

      case "CLOSING":
        if (tcpEvent == "RCV_ACK") state = "TIME_WAIT";
        else return "ERROR";
        break;

      case "FIN_WAIT_2":
        if (tcpEvent == "RCV_FIN") state = "TIME_WAIT";
        else return "ERROR";
        break;

      case "TIME_WAIT":
        if (tcpEvent == "APP_TIMEOUT") state = "CLOSED";
        else return "ERROR";
        break;

      case "CLOSE_WAIT":
        if (tcpEvent == "APP_CLOSE") state = "LAST_ACK";
        else return "ERROR";
        break;

      case "LAST_ACK":
        if (tcpEvent == "RCV_ACK") state = "CLOSED";
        else return "ERROR";
        break;
    }
    console.log(`Transitioned to state = ${state}`);
  }
  return state;
}
