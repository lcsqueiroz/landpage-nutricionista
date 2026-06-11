'use client';

import { useState, useEffect, useRef } from 'react';
import { PACKAGES, OBJECTIVES, buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './LeadModal.module.css';

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function LeadModal({ packageId, onClose }) {
  const panelRef = useRef(null);
  const nameRef = useRef(null);
  const objectiveRef = useRef(null);

  const [fields, setFields] = useState({ name: '', objective: '' });
  const [errors, setErrors] = useState({ name: '', objective: '' });

  const pkg = PACKAGES.find((p) => p.id === packageId);

  /* Bloqueia scroll do body enquanto modal está aberto */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Foca primeiro campo + Escape + focus trap */
  useEffect(() => {
    nameRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.disabled);

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function validate() {
    const next = { name: '', objective: '' };
    if (!fields.name.trim()) next.name = 'Informe seu nome para continuar.';
    if (!fields.objective) next.objective = 'Selecione seu objetivo principal.';
    setErrors(next);
    if (next.name) { nameRef.current?.focus(); return false; }
    if (next.objective) { objectiveRef.current?.focus(); return false; }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppUrl({
      packageId,
      name: fields.name.trim(),
      objective: fields.objective,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.panel}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        <h2 id="modal-title" className={styles.title}>
          Quero o{' '}
          <em className={styles.titlePkg}>{pkg?.name ?? 'pacote'}</em>
        </h2>
        <p className={styles.subtitle}>
          Preencha seus dados e vamos continuar pelo WhatsApp.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Nome */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="modal-name">
              Seu nome
            </label>
            <input
              id="modal-name"
              type="text"
              ref={nameRef}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Digite seu nome"
              value={fields.name}
              autoComplete="given-name"
              aria-describedby={errors.name ? 'modal-name-error' : undefined}
              aria-invalid={errors.name ? 'true' : undefined}
              onChange={(e) => {
                setFields((f) => ({ ...f, name: e.target.value }));
                if (errors.name) setErrors((err) => ({ ...err, name: '' }));
              }}
            />
            {errors.name && (
              <span
                id="modal-name-error"
                className={styles.error}
                role="alert"
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* Objetivo */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="modal-objective">
              Seu objetivo principal
            </label>
            <select
              id="modal-objective"
              ref={objectiveRef}
              className={`${styles.select} ${errors.objective ? styles.inputError : ''}`}
              value={fields.objective}
              aria-describedby={errors.objective ? 'modal-obj-error' : undefined}
              aria-invalid={errors.objective ? 'true' : undefined}
              onChange={(e) => {
                setFields((f) => ({ ...f, objective: e.target.value }));
                if (errors.objective)
                  setErrors((err) => ({ ...err, objective: '' }));
              }}
            >
              <option value="" disabled>
                Selecione seu objetivo
              </option>
              {OBJECTIVES.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
            {errors.objective && (
              <span
                id="modal-obj-error"
                className={styles.error}
                role="alert"
              >
                {errors.objective}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submit}>
            <WhatsAppIcon />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
