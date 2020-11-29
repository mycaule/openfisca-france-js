interface Role {
    key: string
    label: string
    plural?: string
    subroles?: string[]
    entity?: string
    doc?: string // textwrap.dedent
    max?: number
}

// Represents an entity (e.g. a person, a household, etc.) on which calculations can be run.
interface Entity {
    key: string
    label: string
    plural: string
    doc: string    // textwrap.dedent
}

// Represents an entity composed of several persons with different roles, on which calculations are run.
interface GroupEntity extends Entity {
    roles: Role[]
    roles_description?: string[]
    flattened_roles?: string
}

const Famille: GroupEntity = {
    key: "famille",
    plural: "familles",
    label: "Famille",
    doc: "",
    roles: [
        {
            "key": "parent",
            "plural": "parents",
            "label": "Parents",
            "subroles": ["demandeur", "conjoint"],
        },
        { "key": "enfant", "plural": "enfants", "label": "Enfants" },
    ]
}

const Individu: Entity = {
    key: "individu",
    plural: "individus",
    label: "Individu",
    doc: ""
}

const FoyerFiscal: GroupEntity = {
    key: "foyer_fiscal",
    plural: "foyers_fiscaux",
    label: "Déclaration d’impôts",
    doc: `
        Le foyer fiscal désigne l'ensemble des personnes inscrites sur une même déclaration de revenus.
        Il peut y avoir plusieurs foyers fiscaux dans un seul ménage: par exemple, un couple non marié où chacun remplit
        sa propre déclaration de revenus compte pour deux foyers fiscaux.
        Voir https://www.insee.fr/fr/metadonnees/definition/c1735.
    `,
    roles: [
        {
            "key": "declarant",
            "plural": "declarants",
            "label": "Déclarants",
            "subroles": ["declarant_principal", "conjoint"],
        },
        {
            "key": "personne_a_charge",
            "plural": "personnes_a_charge",
            "label": "Personnes à charge",
        },
    ],
}

const Menage: GroupEntity = {
    key: "menage",
    plural: "menages",
    label: "Logement principal",
    doc: `
        Un ménage, au sens statistique du terme, désigne l'ensemble des occupants d'un même logement sans que ces personnes
        soient nécessairement unies par des liens de parenté(en cas de cohabitation, par exemple).
        Un ménage peut être composé d'une seule personne.
        Le niveau de vie ainsi que la pauvreté sont calculés au niveau d'un ménage.
        Voir https://www.insee.fr/fr/metadonnees/definition/c1879.
    `,
    roles: [
        { "key": "personne_de_reference", "label": "Personne de référence", "max": 1 },
        { "key": "conjoint", "label": "Conjoint", "max": 1 },
        { "key": "enfant", "plural": "enfants", "label": "Enfants" },
        { "key": "autre", "plural": "autres", "label": "Autres" },
    ]
}

enum Period {
    DAY = "day",
    MONTH = "month",
    YEAR = "year",
    ETERNITY = "eternity"
}

const FORMULA_NAME_PREFIX = 'formula'

// A variable of the legislation https://openfisca.org/doc/key-concepts/variables.html
interface Variable {
    definition_period: Period
}
// class Variable(object):
//     def __init__(self, baseline_variable = None):
//         self.name = self.__class__.__name__
//         attr = {
//             name: value for name, value in self.__class__.__dict__.items()
//             if not name.startswith('__')}
//         self.baseline_variable = baseline_variable
//         self.value_type = self.set(attr, 'value_type', required = True, allowed_values = VALUE_TYPES.keys())
//         self.dtype = VALUE_TYPES[self.value_type]['dtype']
//         self.json_type = VALUE_TYPES[self.value_type]['json_type']
//         if self.value_type == Enum:
//             self.possible_values = self.set(attr, 'possible_values', required = True, setter = self.set_possible_values)
//         if self.value_type == str:
//             self.max_length = self.set(attr, 'max_length', allowed_type = int)
//             if self.max_length:
//                 self.dtype = '|S{}'.format(self.max_length)
//         if self.value_type == Enum:
//             self.default_value = self.set(attr, 'default_value', allowed_type = self.possible_values, required = True)
//         else:
//             self.default_value = self.set(attr, 'default_value', allowed_type = self.value_type, default = VALUE_TYPES[self.value_type].get('default'))
//         self.entity = self.set(attr, 'entity', required = True, setter = self.set_entity)
//         self.label = self.set(attr, 'label', allowed_type = str, setter = self.set_label)
//         self.end = self.set(attr, 'end', allowed_type = str, setter = self.set_end)
//         self.reference = self.set(attr, 'reference', setter = self.set_reference)
//         self.cerfa_field = self.set(attr, 'cerfa_field', allowed_type = (str, dict))
//         self.unit = self.set(attr, 'unit', allowed_type = str)
//         self.documentation = self.set(attr, 'documentation', allowed_type = str, setter = self.set_documentation)
//         self.set_input = self.set_set_input(attr.pop('set_input', None))
//         self.calculate_output = self.set_calculate_output(attr.pop('calculate_output', None))
//         self.is_period_size_independent = self.set(attr, 'is_period_size_independent', allowed_type = bool, default = VALUE_TYPES[self.value_type]['is_period_size_independent'])

//         formulas_attr, unexpected_attrs = _partition(attr, lambda name, value: name.startswith(FORMULA_NAME_PREFIX))
//         self.formulas = self.set_formulas(formulas_attr)

//         if unexpected_attrs:
//             raise ValueError(
//                 'Unexpected attributes in definition of variable "{}": {!r}'
//                 .format(self.name, ', '.join(sorted(unexpected_attrs.keys()))))

//         self.is_neutralized = False

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
