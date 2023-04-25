export interface SearchCustomerByChronoClientDto {
  chronoClient: string
  codeFichierPartenaire: string,
}

export interface SearchCustomerDto {
  chronoClient?: string,
  codeFichierPartenaire: string,
  codePostal?: string,
  dateDerniereCommandeFrom?: Date,
  dateDerniereCommandeTo?: Date,
  nom?: string,
  prenom?: string,
  ville?: string,
  actif?: boolean | null
}

export interface CustomerSearchResultDto {
  chronoClient: string,
  codeFichierPartenaire: string,
  codePostal: string,
  dateDerniereCommande?: Date, /// had to add '?' to this one
  nom: string,
  prenom: string,
  ville: string,
  actif: boolean | null
}

export interface CodeLabelResultDto {
  code: string,
  label: string
}

export interface OffreReferenceResultDto {
  codeCampagne: number,
  codeOffre: string,
  codeProduit: string,
  dateDerniereModification: Date
  libelleOffre: string,
}

export interface SearchProductDto {
  labelLike : string,
  codeStartsWith? : string,
  numOfItems? : string
}

export interface ProductDto {
  code : string,
  libelle : string,
  commentaire : string,
  offres? : OffreDto[]
}

export interface UpdateProductDto {
  code : any,
  oldLibelle : any,
  newLibelle : string
}

export interface OffreDto {
  code : string,
  libelle : string,
  codeProduit : string,
  dateDerniereCommande? : string
}