import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { authApi, plantasApi } from './apiClient.js';
import { TOKEN_KEY } from '../constants/roles.js';

describe('apiClient authorization', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({})
    });

    // Mock localStorage
    const storage = {};
    global.localStorage = {
      getItem: jest.fn((key) => storage[key]),
      setItem: jest.fn((key, value) => {
        storage[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete storage[key];
      })
    };
  });

  it('includes token in Authorization header for /me', async () => {
    const token = 'test-token';
    localStorage.setItem(TOKEN_KEY, token);

    await authApi.getProfile();

    expect(fetch).toHaveBeenCalledTimes(1);
    const [, options] = fetch.mock.calls[0];
    expect(options.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('includes token in Authorization header for /plantas', async () => {
    const token = 'test-token';
    localStorage.setItem(TOKEN_KEY, token);

    await plantasApi.getPlants();

    expect(fetch).toHaveBeenCalledTimes(1);
    const [, options] = fetch.mock.calls[0];
    expect(options.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });
});
