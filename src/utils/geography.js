import mapData from '../../public/data/constituency_map.json';

export const getStates = () => {
  return mapData.states.map(s => s.name);
};

export const getDistricts = (stateName) => {
  const state = mapData.states.find(s => s.name === stateName);
  return state ? state.districts.map(d => d.name) : [];
};

export const getConstituencies = (stateName, districtName) => {
  const state = mapData.states.find(s => s.name === stateName);
  if (!state) return [];
  const district = state.districts.find(d => d.name === districtName);
  return district ? district.constituencies : [];
};
