export type SpeciesType = 'perro' | 'gato' | 'otros';
export type SizeType = 'pequeño' | 'mediano' | 'grande';
export type AgeCategoryType = 'cachorro' | 'joven' | 'adulto' | 'senior';
export type EnergyLevelType = 'baja' | 'media' | 'alta';
export type GenderType = 'macho' | 'hembra';

export interface Pet {
  id: string;
  name: string;
  species: SpeciesType;
  breed: string;
  age: string;
  ageCategory: AgeCategoryType;
  gender: GenderType;
  size: SizeType;
  energyLevel: EnergyLevelType;
  photo: string;
  gallery: string[];
  story: string;
  personalityTags: string[];
  isVaccinated: boolean;
  isSterilized: boolean;
  isDewormed: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  weight: string;
  location: string;
  rescueDate: string;
  urgent?: boolean;
}

export interface FilterState {
  species: string;
  size: string;
  ageCategory: string;
  energyLevel: string;
  searchTerm: string;
}

export interface AdoptionApplication {
  petId: string;
  petName: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  housingType: 'casa' | 'departamento' | 'finca';
  hasYard: 'si' | 'no';
  hasOtherPets: 'si' | 'no';
  familyAgrees: boolean;
  experienceNotes: string;
}
