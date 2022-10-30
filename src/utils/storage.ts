/**
 * This module intents to create discipline over the usage of storage
 */
class _LocalStorage {
  private static instance: _LocalStorage;

  /**
   * Key in which to store the authentication data
   */
  private _authenticationKey = 'tk';

  /**
   * Key in which to store a logged user's data
   */
  private _userData = 'ud';

  private constructor() {}

  public static getInstance() {
    if (!_LocalStorage.instance) {
      _LocalStorage.instance = new _LocalStorage();
    }

    return _LocalStorage.instance;
  }

  /**
   * A getter for the key in which to store the authentication data
   */
  public get authenticationKey() {
    return this._authenticationKey;
  }

  /**
   * A getter for the user's data in which to store the authentication data
   */
  public get userData() {
    return this._userData;
  }

  /**
   * Store the authentication data on localStorage
   * @param data data to be saved
   */
  public saveAuthentication(data: string) {
    localStorage.setItem(this.authenticationKey, data);
  }

  /**
   * Reads the authentication data stored on localStorage
   */
  public readAuthentication() {
    return localStorage.getItem(this.authenticationKey);
  }

  /**
   * Removes the authentication data stored on localStorage
   */
  public removeAuthentication() {
    localStorage.removeItem(this.authenticationKey);
  }

  /**
   * Stores the user data on localStorage
   * @param data data to be saved
   */
  public saveUserData(data: string) {
    localStorage.setItem(this.userData, data);
  }

  /**
   * Reads the user's data stored on localStorage
   */
  public readUserData() {
    return localStorage.getItem(this.userData);
  }

  /**
   * Removes the user's data stored on localStorage
   */
  public removeUserData() {
    localStorage.removeItem(this.userData);
  }
}

export const LocalStorage = _LocalStorage.getInstance() as _LocalStorage;
