/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entidades;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Sebastian
 */
@Entity
@Table
public class Auditoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "auditoria_id")
    private Long id;

    @Column(name = "auditoria_nombre")
    private String nombre;

    @Column(name = "auditoria_descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auditor_id")
    private Auditor auditor;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "plantillabd_id")
    private Plantillabd plantillabd;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "plantillainf_id")
    private Plantillainf plantillainf;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "plantillared_id")
    private Plantillared plantillared;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "plantillarh_id")
    private Plantillarh plantillarh;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "plantillaso_id")
    private Plantillaso plantillaso;

    public Auditoria(Long id, String nombre, String descripcion, Auditor auditor) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.auditor = auditor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Auditor getAuditor() {
        return auditor;
    }

    public void setAuditor(Auditor auditor) {
        this.auditor = auditor;
    }

    public Plantillabd getPlantillabd() {
        return plantillabd;
    }

    public void setPlantillabd(Plantillabd plantillabd) {
        this.plantillabd = plantillabd;
    }

    public Plantillainf getPlantillainf() {
        return plantillainf;
    }

    public void setPlantillainf(Plantillainf plantillainf) {
        this.plantillainf = plantillainf;
    }

    public Plantillared getPlantillared() {
        return plantillared;
    }

    public void setPlantillared(Plantillared plantillared) {
        this.plantillared = plantillared;
    }

    public Plantillarh getPlantillarh() {
        return plantillarh;
    }

    public void setPlantillarh(Plantillarh plantillarh) {
        this.plantillarh = plantillarh;
    }

    public Plantillaso getPlantillaso() {
        return plantillaso;
    }

    public void setPlantillaso(Plantillaso plantillaso) {
        this.plantillaso = plantillaso;
    }

}
