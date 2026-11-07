import { useDemo } from './useDemo';
import { familyState, childProfile } from '../demo/selectors';
export function useFamily() {
  const demo = useDemo();
  return { ...demo, state: familyState(demo.state), child: childProfile(demo.state) };
}
