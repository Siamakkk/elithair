import {UserRepository} from '../src/user/user.repository'
import {User} from '../src/user/user.dto'
import { StandardError } from '../src/utils/standardError';
import { ErrorMessages } from '../src/eums/errorMessages';

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  describe('createUser', () => {
    it('should create a new user and assign an ID', () => {
      const user: User = { id: 0, name: 'John Doe', email: 'john.doe@example.com', favoriteGenres: [] };

      const createdUser = userRepository.createUser(user);

      expect(createdUser).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        favoriteGenres: [],
      });
    });

    it('should throw an error if the user already exists', () => {
      const user: User = { id: 0, name: 'Jane Doe', email: 'jane.doe@example.com', favoriteGenres: [] };
      userRepository.createUser(user);

      expect(() => userRepository.createUser(user)).toThrow(StandardError);
      expect(() => userRepository.createUser(user)).toThrow(ErrorMessages.USER_ALREADY_EXIST);
    });

    it('should initialize favoriteGenres as an empty array if not provided', () => {
      const user: User = { id: 0, name: 'John Doe', email: 'john.doe@example.com' };

      const createdUser = userRepository.createUser(user);

      expect(createdUser.favoriteGenres).toEqual([]);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', () => {
      const user: User = { id: 0, name: 'Siamak', email: 'siamak@gmail.com', favoriteGenres: [] };
      userRepository.createUser(user);

      const foundUser = userRepository.findUserById(1);

      expect(foundUser).toEqual({
        id: 1,
        name: 'Siamak',
        email: 'siamak@gmail.com',
        favoriteGenres: [],
      });
    });

    it('should throw not found error if the user ID does not exist', () => {
      expect(() => userRepository.findUserById(999)).toThrow(StandardError);
      expect(() => userRepository.findUserById(999)).toThrow(ErrorMessages.USER_NOT_FOUND);
    });
  });

  describe('private findUserByEmail', () => {
    it('should return a user by email', () => {
      const user: User = { id: 0, name: 'Bob', email: 'bob@example.com', favoriteGenres: [] };
      userRepository.createUser(user);

      // Using a workaround to test private method
      const findUserByEmail = (email: string) =>
        (userRepository as any).findUserByEmail(email);

      const foundUser = findUserByEmail('bob@example.com');

      expect(foundUser).toEqual({
        id: 1,
        name: 'Bob',
        email: 'bob@example.com',
        favoriteGenres: [],
      });
    });

    it('should return null if the email does not exist', () => {
      // Using a workaround to test private method
      const findUserByEmail = (email: string) =>
        (userRepository as any).findUserByEmail(email);

      const foundUser = findUserByEmail('nonexistent@example.com');

      expect(foundUser).toBeNull();
    });
  });
});
