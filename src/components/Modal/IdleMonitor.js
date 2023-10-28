import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


function IdleMonitor()
{
  //Modal
  const [idleModal, setIdleModal] = useState(false);

  let idleTimeout = 1000 * 60 * 1;  //1 minute
  let idleLogout = 1000 * 60 * 2; //2 Minutes
  let idleEvent; 
  let idleLogoutEvent;

  /**
   * Add any other events listeners here
   */
  const events = [
    'mousemove',
    'click',
    'keypress'
  ];


  /**
   * @method sessionTimeout
   * This function is called with each event listener to set a timeout or clear a timeout.
   */
  const sessionTimeout = () => 
  {  
    if(!!idleEvent) clearTimeout(idleEvent);
    if(!!idleLogoutEvent) clearTimeout(idleLogoutEvent);

    idleEvent = setTimeout(() => setIdleModal(true), idleTimeout); //show session warning modal.
    idleLogoutEvent = setTimeout(() => logOut, idleLogout); //Call logged out on session expire.
  };

  /**
   * @method extendSession
   * This function will extend current user session.
   */
  const extendSession = () => 
  {
    console.log('user wants to stay logged in');
  }


  /**
   * @method logOut
   * This function will destroy current user session.
   */
  const logOut = () => 
  {
    console.log('logging out');
  }

  useEffect(() => 
  {
    for (let e in events) 
    {
      window.addEventListener(events[e], sessionTimeout);
    }

    return () => 
    {
      for(let e in events)
      {
        window.removeEventListener(events[e], sessionTimeout);
      }
    }
  },[]);


    return (

      <Modal isOpen={idleModal} toggle={() => setIdleModal(false)}>
        <ModalHeader toggle={() => setIdleModal(false)}>
            Session expire warning
        </ModalHeader>
        <ModalBody>
            your session will expire in {idleLogout / 60 / 1000} minutes. Do you want to extend the session?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-info"  onClick={()=> logOut()}>Logout</button>
          <button className="btn btn-success" onClick={()=> extendSession()}>Extend session</button>
        
        </ModalFooter>
      </Modal>
    )

  }

export default IdleMonitor;