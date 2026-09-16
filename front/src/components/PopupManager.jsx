import { useEffect, useRef, useState } from 'react';
import { popupRequest } from '../lib/popupApi';
import './PopupManager.css';

function PopupPreview({ popup, onExpired }) {
  const [src, setSrc] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false;
    let url;
    popupRequest(`admin/popups/${popup.id}/image`)
      .then(res => res.blob()).then(blob => {
        if (disposed) return;
        url = URL.createObjectURL(blob);
        setSrc(url);
      }).catch(error => {
        if (disposed) return;
        setFailed(true);
        if (error.status === 401) onExpired();
      });
    return () => { disposed = true; if (url) URL.revokeObjectURL(url); };
  }, [popup.id, popup.imageRevision, onExpired]);
  return src ? <a href={src} target="_blank" rel="noreferrer" aria-label={`${popup.title} 원본 보기`}>
    <img src={src} alt={popup.title} className="popup-table-image" />
  </a> : <div className="popup-image-placeholder">{failed ? '이미지를 불러올 수 없습니다.' : '이미지 불러오는 중…'}</div>;
}

export default function PopupManager({ onExpired }) {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [editing, setEditing] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    if (editorOpen) editor.current?.showModal();
    else editor.current?.close();
  }, [editorOpen]);

  useEffect(() => {
    let disposed = false;
    popupRequest('admin/popups').then(res => res.json()).then(data => {
      if (!disposed) setPopups(data);
    }).catch(err => {
      if (!disposed) { setError(err.message); if (err.status === 401) onExpired(); }
    }).finally(() => { if (!disposed) setLoading(false); });
    return () => { disposed = true; };
  }, [onExpired]);

  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function reset() {
    setEditing(null); setTitle(''); setFile(null); setInputKey(key => key + 1); setEditorOpen(false);
  }
  async function perform(action) {
    setBusy(true); setError(''); setNotice('');
    try { await action(); }
    catch (err) { setError(err.message); if (err.status === 401) onExpired(); }
    finally { setBusy(false); }
  }
  function selectFile(event) {
    const selected = event.target.files[0];
    setError('');
    if (selected && (!['image/png', 'image/jpeg', 'image/webp'].includes(selected.type) || selected.size > 5 * 1024 * 1024)) {
      setError('5MB 이하의 PNG, JPEG 또는 WebP 이미지를 선택해 주세요.');
      setFile(null); event.target.value = ''; return;
    }
    setFile(selected || null);
  }
  function submit(event) {
    event.preventDefault();
    if (!file) { setError('이미지를 선택해 주세요.'); return; }
    perform(async () => {
      const body = new FormData(); body.append('title', title.trim()); body.append('image', file);
      const res = await popupRequest(editing ? `admin/popups/${editing}/image` : 'admin/popups', { method: editing ? 'PUT' : 'POST', body });
      const saved = await res.json();
      setPopups(items => editing ? items.map(item => item.id === editing ? saved : item) : [...items, saved]);
      setNotice(editing ? '이미지를 교체했습니다.' : '비활성 상태로 추가했습니다. 확인 후 활성화해 주세요.');
      reset();
    });
  }
  const visiblePopups = activeOnly ? popups.filter(popup => popup.active) : popups;
  return <section aria-label="팝업 관리" className="popup-management">
    <div className="popup-toolbar">
      <button type="button" className="popup-button popup-button-primary-outline" disabled={loading || busy} onClick={() => {
        reset(); setError(''); setNotice(''); setEditorOpen(true);
      }}>+ 팝업 추가</button>
      <span className="popup-toolbar-help">홈페이지에 표시할 팝업을 관리합니다.</span>
    </div>
    {error && !editorOpen && <p role="alert" className="popup-message popup-message-error">{error}</p>}
    {notice && <p role="status" className="popup-message popup-message-success">{notice}</p>}
    <div className="popup-list-panel">
      <div className="popup-list-filter">
        <label><input type="checkbox" checked={activeOnly} onChange={event => setActiveOnly(event.target.checked)} /> 활성 팝업만 보기</label>
        <span>전체 <strong>{popups.length}</strong>개 · 활성 <strong>{popups.filter(popup => popup.active).length}</strong>개</span>
      </div>
      <table className="popup-table">
        <thead><tr><th>NO</th><th>팝업 이미지</th><th>팝업 제목</th><th>노출 상태</th><th>관리</th></tr></thead>
        <tbody>
          {visiblePopups.map(popup => <tr key={popup.id} aria-label={popup.title}>
            <td className="popup-number">{popup.id}</td>
            <td className="popup-image-cell"><PopupPreview key={`${popup.id}:${popup.imageRevision}`} popup={popup} onExpired={onExpired} /></td>
            <td className="popup-title-cell"><span className="popup-mobile-label">팝업 제목</span><strong>{popup.title}</strong></td>
            <td className="popup-status-cell"><span className={`popup-status ${popup.active ? 'is-active' : ''}`}>{popup.active ? '활성' : '비활성'}</span></td>
            <td className="popup-actions-cell"><div className="popup-row-actions">
              <button disabled={busy} className="popup-button" onClick={() => perform(async () => {
                const res = await popupRequest(`admin/popups/${popup.id}/active`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !popup.active }) });
                const saved = await res.json(); setPopups(items => items.map(item => item.id === saved.id ? saved : item));
                setNotice(saved.active ? '팝업을 활성화했습니다.' : '팝업을 비활성화했습니다.');
              })}>{popup.active ? '비활성화' : '활성화'}</button>
              <button disabled={busy} className="popup-button" onClick={() => {
                setEditing(popup.id); setTitle(popup.title); setFile(null); setInputKey(key => key + 1); setNotice(''); setError(''); setEditorOpen(true);
              }}>이미지 교체</button>
              <button disabled={busy} className="popup-button popup-button-danger" onClick={() => {
                if (!window.confirm(`“${popup.title}” 팝업을 삭제하시겠습니까?`)) return;
                perform(async () => { await popupRequest(`admin/popups/${popup.id}`, { method: 'DELETE' });
                  setPopups(items => items.filter(item => item.id !== popup.id)); if (editing === popup.id) reset(); setNotice('팝업을 삭제했습니다.'); });
              }}>삭제</button>
            </div></td>
          </tr>)}
        </tbody>
      </table>
      {loading ? <p role="status" className="popup-empty">팝업을 불러오는 중…</p> : visiblePopups.length === 0 && <p className="popup-empty">{activeOnly ? '활성 팝업이 없습니다.' : '등록된 팝업이 없습니다. 팝업을 추가해 주세요.'}</p>}
    </div>
    <dialog ref={editor} className="popup-editor" onCancel={event => { event.preventDefault(); if (!busy) reset(); }} aria-labelledby="popup-editor-title">
      <form onSubmit={submit}>
        <div className="popup-editor-heading"><h2 id="popup-editor-title">{editing ? '팝업 이미지 교체' : '팝업 추가'}</h2>
          <button type="button" disabled={busy} onClick={reset} aria-label="편집창 닫기" className="popup-editor-close">×</button>
        </div>
        <fieldset disabled={busy} className="popup-editor-body">
          {error && <p role="alert" className="popup-message popup-message-error">{error}</p>}
          <label>팝업 제목<input aria-label="팝업 제목" value={title} onChange={event => setTitle(event.target.value)} maxLength={120} required placeholder="팝업 제목을 입력해 주세요" /></label>
          <label>팝업 이미지<input key={inputKey} aria-label="이미지 파일" type="file" accept="image/png,image/jpeg,image/webp" onChange={selectFile} required /></label>
          <p className="popup-editor-help">PNG, JPEG, WebP · 최대 5MB<br />이미지는 원본 비율과 화질을 유지하여 등록됩니다.</p>
          {preview && <div className="popup-upload-preview"><img src={preview} alt="업로드 미리보기" /></div>}
          {!editing && <p className="popup-editor-help">새 팝업은 비활성 상태로 등록됩니다. 목록에서 활성화해 주세요.</p>}
        </fieldset>
        <div className="popup-editor-footer">
          <button type="button" disabled={busy} onClick={reset} className="popup-button">취소</button>
          <button disabled={busy} className="popup-button popup-button-primary">{busy ? '저장 중…' : editing ? '교체 저장' : '등록'}</button>
        </div>
      </form>
    </dialog>
  </section>;
}
