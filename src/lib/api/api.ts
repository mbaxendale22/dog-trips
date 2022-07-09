import { Person } from '../../redux/people';
import { DATES, screenOptions } from '../Constants';
import { generateRandomNum, isOdd } from '../helpers';
import { DatedTrip } from '../types';
import { supabase } from './init';

export async function getUsersByHousehold(household: number) {
  const user = localStorage.getItem('user');
  if (user !== 'authenticated') return;
  let { data: users, error } = await supabase
    .from('user_profile')
    .select('*')
    .eq('household', household);

  return users;
}

export async function postPerson(user: Person | null | undefined) {
  // add error handling
  if (!user) {
    return;
  }
  console.log('user inside PP call', user);
  const user_profile = user.id;
  const household = user.household;
  const { data, error } = await supabase
    .from('trips')
    .insert([{ user_profile: user_profile, household: household }]);
}

export function selectPerson(
  person1: Person | null | undefined,
  person2: Person | null | undefined
) {
  let dogWalker = {} as Person | null | undefined;
  const num = generateRandomNum(0, 100);
  dogWalker = isOdd(num) ? person1 : person2;

  if (!dogWalker) return;

  console.log('dogWALKER', dogWalker);

  const formattedDogWalker = {
    id: dogWalker.id,
    created_at: dogWalker.created_at,
    user_profile: {
      name: dogWalker.name
    },
    household: dogWalker.household
  };
  return dogWalker;
}

export async function userLogin(
  setter: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  password: string
) {
  let { user, error } = await supabase.auth.signIn({
    email,
    password
  });
  if (error) {
    return 'no user found';
  }
  if (!user) {
    return;
  }
  localStorage.setItem('user', user.role as string);
  setter(screenOptions.CHOOSE_PERSON);
}

export async function getThisMonthsTrips() {
  const { monthStart, today } = DATES;

  let { data, error } = await supabase
    .from<DatedTrip>('trips')
    .select('*, user_profile!inner(*)')
    .eq('household', 1)
    .gte('created_at', monthStart.toISOString())
    .lte('created_at', today.toISOString());

  return data;
}
