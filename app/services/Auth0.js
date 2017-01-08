/**
 * Created by Luan on 11/7/2016.
 */
import Auth0Lock from 'auth0-lock';
import Constants from "./../Constants";

export const LOCK_OPTIONS = {
    closable: true,
    disableSignUp: true,
    disableResetPassword: true,
}

const Lock = new Auth0Lock(Constants.Auth0.clientId,Constants.Auth0.domain);

export default Lock;
