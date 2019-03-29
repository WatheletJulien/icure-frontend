/*
 * Copyright (C) 2018 Taktik SA
 *
 * This file is part of iCureBackend.
 *
 * iCureBackend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * iCureBackend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with iCureBackend.  If not, see <http://www.gnu.org/licenses/>.
 */

//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.8-b130911.1802 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2015.11.10 à 11:53:40 AM CET 
//


package org.taktik.icure.services.external.rest.v1.dto.be.ehealth.kmehr.v20150301.be.fgov.ehealth.standards.kmehr.id.v1;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour ID-HCPARTYschemes.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * <p>
 * <pre>
 * &lt;simpleType name="ID-HCPARTYschemes">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="ID-HCPARTY"/>
 *     &lt;enumeration value="INSS"/>
 *     &lt;enumeration value="LOCAL"/>
 *     &lt;enumeration value="ID-ENCRYPTION-APPLICATION"/>
 *     &lt;enumeration value="ID-ENCRYPTION-ACTOR"/>
 *     &lt;enumeration value="ID-INSURANCE"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "ID-HCPARTYschemes")
@XmlEnum
public enum IDHCPARTYschemes {

    @XmlEnumValue("ID-HCPARTY")
    ID_HCPARTY("ID-HCPARTY"),
    INSS("INSS"),
    LOCAL("LOCAL"),
    @XmlEnumValue("ID-ENCRYPTION-APPLICATION")
    ID_ENCRYPTION_APPLICATION("ID-ENCRYPTION-APPLICATION"),
    @XmlEnumValue("ID-ENCRYPTION-ACTOR")
    ID_ENCRYPTION_ACTOR("ID-ENCRYPTION-ACTOR"),
    @XmlEnumValue("ID-INSURANCE")
    ID_INSURANCE("ID-INSURANCE");
    private final String value;

    IDHCPARTYschemes(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static IDHCPARTYschemes fromValue(String v) {
        for (IDHCPARTYschemes c: IDHCPARTYschemes.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}