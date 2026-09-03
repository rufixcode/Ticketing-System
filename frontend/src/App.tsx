import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { type AuthUser, login, register } from './services/authService';
import { createUser, deleteUser, getUsers, updateUser, type UserFormPayload } from './services/userService';
import './App.css';

type AuthMode = 'login' | 'register';
type Page = 'home' | 'accounts' | 'tickets' | 'favorites';

type EventCard = {
  id: string;
  title: string;
  venue: string;
  price: string;
  rating: string;
  image: string;
  category: string;
};

type UserFormState = UserFormPayload & {
  id?: number;
};

const emptyUserForm: UserFormState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const categories = ['Concerts', 'Movies', 'Sports', 'Theater', 'Festivals'];

const events: EventCard[] = [
  {
    id: 'midnight-eclipse',
    title: 'Midnight Eclipse Tour',
    venue: 'Brooklyn Steel, NY',
    price: '$49.99',
    rating: '4.9',
    category: 'Concerts',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lakers-celtics',
    title: 'Lakers vs Celtics',
    venue: 'Madison Square Garden',
    price: '$89',
    rating: '4.8',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'summer-beats',
    title: 'Summer Beats Festival',
    venue: 'MetLife Stadium',
    price: '$120',
    rating: '5.0',
    category: 'Festivals',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hamilton',
    title: 'Hamilton Broadway',
    venue: 'Richard Rodgers Theatre',
    price: '$99',
    rating: '4.7',
    category: 'Theater',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
  },
];

function App() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [page, setPage] = useState<Page>('home');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [userForm, setUserForm] = useState<UserFormState>(emptyUserForm);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [passwordConfirmation, setPasswordConfirmation] = useState('password');
  const [accountSearch, setAccountSearch] = useState('');
  const [error, setError] = useState('');
  const [accountMessage, setAccountMessage] = useState('');
  const [accountError, setAccountError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = accountSearch.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((apiUser) =>
      `${apiUser.name} ${apiUser.email}`.toLowerCase().includes(query),
    );
  }, [accountSearch, users]);

  useEffect(() => {
    if (user) {
      void loadUsers();
    }
  }, [user]);

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result =
        mode === 'login'
          ? await login({ email, password })
          : await register({
              name,
              email,
              password,
              password_confirmation: passwordConfirmation,
            });

      setUser(result.user);
      setPage('home');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Request failed.');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUsers() {
    setAccountError('');
    setIsUsersLoading(true);

    try {
      setUsers(await getUsers());
    } catch (caughtError) {
      setAccountError(caughtError instanceof Error ? caughtError.message : 'Unable to load accounts.');
    } finally {
      setIsUsersLoading(false);
    }
  }

  async function handleAccountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountMessage('');
    setAccountError('');
    setIsUsersLoading(true);

    try {
      if (userForm.id) {
        const payload: Partial<UserFormPayload> = {
          name: userForm.name,
          email: userForm.email,
        };

        if (userForm.password) {
          payload.password = userForm.password;
          payload.password_confirmation = userForm.password_confirmation;
        }

        await updateUser(userForm.id, payload);
        setAccountMessage('Account updated.');
      } else {
        await createUser(userForm);
        setAccountMessage('Account created.');
      }

      setUserForm(emptyUserForm);
      await loadUsers();
    } catch (caughtError) {
      setAccountError(caughtError instanceof Error ? caughtError.message : 'Unable to save account.');
    } finally {
      setIsUsersLoading(false);
    }
  }

  async function handleDeleteUser(id: number) {
    setAccountMessage('');
    setAccountError('');
    setIsUsersLoading(true);

    try {
      await deleteUser(id);
      setAccountMessage('Account deleted.');
      await loadUsers();
    } catch (caughtError) {
      setAccountError(caughtError instanceof Error ? caughtError.message : 'Unable to delete account.');
    } finally {
      setIsUsersLoading(false);
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError('');

    if (nextMode === 'login') {
      setEmail('test@example.com');
      setPassword('password');
      setPasswordConfirmation('password');
      return;
    }

    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  }

  function startEdit(apiUser: AuthUser) {
    setUserForm({
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      password: '',
      password_confirmation: '',
    });
    setAccountMessage('');
    setAccountError('');
    setPage('accounts');
  }

  if (!user) {
    return (
      <main className="auth-page">
        <section className="auth-preview">
          <div className="auth-preview-overlay" />
          <div className="brand auth-brand">
            <span className="brand-icon">M</span>
            MallTix
          </div>
          <div className="auth-preview-copy">
            <span>Reserve the moment</span>
            <h1>Book mall cinema seats and event tickets in one place.</h1>
            <p>Sign in to manage schedules, customer accounts, and reservations.</p>
          </div>
        </section>

        <section className="auth-panel">
          <form className="auth-card" onSubmit={handleAuthSubmit}>
            <div className="login-header">
              <span>Welcome to MallTix</span>
              <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
              <p>
                {mode === 'login'
                  ? 'Use your database account to access the system.'
                  : 'Create a customer account stored in the backend database.'}
              </p>
            </div>

            <div className="mode-switch" aria-label="Authentication mode">
              <button
                type="button"
                className={mode === 'login' ? 'active' : ''}
                onClick={() => switchMode('login')}>
                Login
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'active' : ''}
                onClick={() => switchMode('register')}>
                Register
              </button>
            </div>

            {mode === 'register' && (
              <label>
                Name
                <input value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
            )}

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={mode === 'register' ? 8 : undefined}
                required
              />
            </label>

            {mode === 'register' && (
              <label>
                Confirm password
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>
            )}

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
            </button>

            {error && <p className="status error">{error}</p>}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="home-page">
      <header className="site-header">
        <button className="brand brand-button" type="button" onClick={() => setPage('home')}>
          <span className="brand-icon">M</span>
          MallTix
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} type="button" onClick={() => setPage('home')}>Home</button>
          <button className={page === 'accounts' ? 'active' : ''} type="button" onClick={() => setPage('accounts')}>Accounts</button>
          <button className={page === 'tickets' ? 'active' : ''} type="button" onClick={() => setPage('tickets')}>Tickets</button>
          <button className={page === 'favorites' ? 'active' : ''} type="button" onClick={() => setPage('favorites')}>Favorites</button>
        </nav>

        <div className="header-actions">
          <span className="signed-in">{user.name}</span>
          <button type="button" className="logout-button" onClick={() => setUser(null)}>Logout</button>
        </div>
      </header>

      {page === 'home' && (
        <>
          <section className="category-row" aria-label="Event categories">
            <div className="category-buttons">
              {categories.map((category, index) => (
                <button className={index === 0 ? 'selected' : ''} key={category} type="button">
                  {category}
                </button>
              ))}
            </div>
            <label className="search-box">
              <span aria-hidden="true">Q</span>
              <input type="search" placeholder="Search events, venues, artists..." />
            </label>
          </section>

          <section className="featured-hero">
            <img
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=80"
              alt="Festival crowd in front of a lit concert stage"
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <span>Featured event</span>
              <div>
                <h1>Coachella Valley Music & Arts Festival</h1>
                <p>Indio, California · Pass availability extremely limited</p>
              </div>
            </div>
            <time>April 10 - 12, 2026</time>
            <button type="button">Get Tickets</button>
          </section>

          <section className="trending-section">
            <div className="section-title">
              <h2>Trending Near You</h2>
              <p>{events.length} available events</p>
            </div>

            <div className="event-grid">
              {events.map((event) => (
                <article className="event-card" key={event.id}>
                  <img src={event.image} alt="" />
                  <div className="event-body">
                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.venue}</p>
                    </div>
                    <span className="rating">Star {event.rating}</span>
                    <footer>
                      <strong>From {event.price}</strong>
                      <button type="button">Book Now +</button>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'accounts' && (
        <section className="accounts-page">
          <div className="accounts-hero">
            <div>
              <span>Customer records</span>
              <h1>Accounts</h1>
              <p>Manage the users stored in your Laravel database.</p>
            </div>
            <button type="button" onClick={loadUsers} disabled={isUsersLoading}>
              {isUsersLoading ? 'Refreshing...' : 'Refresh accounts'}
            </button>
          </div>

          <div className="account-stats">
            <article>
              <span>Total users</span>
              <strong>{users.length}</strong>
            </article>
            <article>
              <span>Visible users</span>
              <strong>{filteredUsers.length}</strong>
            </article>
            <article>
              <span>Signed in</span>
              <strong>{user.name}</strong>
            </article>
          </div>

          <div className="accounts-layout">
            <form className="account-form" onSubmit={handleAccountSubmit}>
              <div>
                <span>{userForm.id ? 'Edit account' : 'New account'}</span>
                <h2>{userForm.id ? userForm.name : 'Add customer'}</h2>
              </div>

              <label>
                Full name
                <input
                  value={userForm.name}
                  onChange={(event) => setUserForm((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
                  minLength={userForm.id ? undefined : 8}
                  placeholder={userForm.id ? 'Optional when editing' : 'Minimum 8 characters'}
                  required={!userForm.id}
                />
              </label>

              <label>
                Confirm password
                <input
                  type="password"
                  value={userForm.password_confirmation}
                  onChange={(event) => setUserForm((current) => ({ ...current, password_confirmation: event.target.value }))}
                  minLength={userForm.id ? undefined : 8}
                  placeholder={userForm.id ? 'Only needed for new password' : 'Repeat password'}
                  required={!userForm.id}
                />
              </label>

              <div className="form-actions">
                <button className="primary-button" type="submit" disabled={isUsersLoading}>
                  {userForm.id ? 'Save account' : 'Create account'}
                </button>
                {userForm.id && (
                  <button className="secondary-button" type="button" onClick={() => setUserForm(emptyUserForm)}>
                    Cancel
                  </button>
                )}
              </div>

              {accountMessage && <p className="status success">{accountMessage}</p>}
              {accountError && <p className="status error">{accountError}</p>}
            </form>

            <section className="accounts-list-card">
              <div className="accounts-list-header">
                <div>
                  <span>Users</span>
                  <h2>Customer accounts</h2>
                </div>
                <label className="account-search">
                  <span aria-hidden="true">Q</span>
                  <input
                    type="search"
                    value={accountSearch}
                    onChange={(event) => setAccountSearch(event.target.value)}
                    placeholder="Search accounts..."
                  />
                </label>
              </div>

              <div className="account-list">
                {filteredUsers.map((apiUser) => (
                  <article className="account-row" key={apiUser.id}>
                    <div className="account-avatar">{apiUser.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{apiUser.name}</strong>
                      <span>{apiUser.email}</span>
                    </div>
                    <div className="account-actions">
                      <button type="button" onClick={() => startEdit(apiUser)}>Edit</button>
                      <button className="danger-button" type="button" onClick={() => handleDeleteUser(apiUser.id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}

                {!filteredUsers.length && (
                  <div className="empty-state">
                    {isUsersLoading ? 'Loading accounts...' : 'No accounts found.'}
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      )}

      {(page === 'tickets' || page === 'favorites') && (
        <section className="placeholder-page">
          <span>{page}</span>
          <h1>{page === 'tickets' ? 'Tickets' : 'Favorites'}</h1>
          <p>This page is ready for the next feature.</p>
        </section>
      )}
    </main>
  );
}

export default App;
