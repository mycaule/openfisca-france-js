// TODO Famille, FoyerFiscal, Individu, Menage, cf entities.py

enum TypesActivite {
    actif = "Actif occupé",
    chomeur = "Chômeur",
    etudiant = "Étudiant, élève",
    retraite = "Retraité",
    inactif = "Autre, inactif",
}

enum TypesCategorieNonSalarie {
    non_pertinent = "Non pertinent (l'individu n'est pas un travailleur indépendant)",
    artisan = "Artisant",
    commercant = "Commercant",
    profession_liberale = "Profession libérale",
}

enum TypesCategorieSalarie {
    prive_non_cadre = "prive_non_cadre",
    prive_cadre = "prive_cadre",
    public_titulaire_etat = "public_titulaire_etat",
    public_titulaire_militaire = "public_titulaire_militaire",
    public_titulaire_territoriale = "public_titulaire_territoriale",
    public_titulaire_hospitaliere = "public_titulaire_hospitaliere",
    public_non_titulaire = "public_non_titulaire",
    non_pertinent = "non_pertinent",
}

enum TypesStatutMarital {
    non_renseigne = "Non renseigné",
    marie = "Marié",
    celibataire = "Celibataire",
    divorce = "Divorcé",
    veuf = "Veuf",
    pacse = "Pacsé",
    jeune_veuf = "Jeune veuf",
}

enum TypesStatutOccupationLogement {
    non_renseigne = "Non renseigné",
    primo_accedant = "Accédant à la propriété",
    proprietaire = "Propriétaire (non accédant) du logement",
    locataire_hlm = "Locataire d'un logement HLM",
    locataire_vide = "Locataire ou sous-locataire d'un logement loué vide non-HLM",
    locataire_meuble = "Locataire ou sous-locataire d'un logement loué meublé ou d'une chambre d'hôtel",
    loge_gratuitement = "Logé gratuitement par des parents, des amis ou l'employeur",
    locataire_foyer = "Locataire d'un foyer (résidence universitaire, maison de retraite, foyer de jeune travailleur, résidence sociale...)",
    sans_domicile = "Sans domicile stable",
}

// Taux de prime moyen de la fonction publique
const TAUX_DE_PRIME = 0.195  // primes_fonction_publique (hors suppl.familial et indemnité de résidence) /rémunération brute
