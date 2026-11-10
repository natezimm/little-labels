import React, { useState } from 'react';
import { Child } from '../types';
import {
  ArrowLeft,
  Printer,
  Users,
  Calendar,
  Download,
  Upload,
  ShieldCheck,
  Check,
  Edit2,
  Plus,
  Lock,
} from 'lucide-react';

interface Screen5SettingsProps {
  childrenList: Child[];
  onUpdateChildren: (children: Child[]) => void;
  onBack: () => void;
}

export const Screen5Settings: React.FC<Screen5SettingsProps> = ({
  childrenList,
  onUpdateChildren,
  onBack,
}) => {
  const [printerModel, setPrinterModel] = useState('Brother QL-810W');
  const [dateFormat, setDateFormat] = useState('MM/DD/YY');
  const [exportNotice, setExportNotice] = useState(false);

  // Child Editing State
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [editColor, setEditColor] = useState('#0284C7');

  const startEditChild = (child: Child) => {
    setEditingChild(child);
    setEditFirstName(child.firstName);
    setEditLastName(child.lastName);
    setEditRoom(child.room);
    setEditColor(child.color);
  };

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChild || !editFirstName.trim()) return;

    const updated = childrenList.map((ch) => {
      if (ch.id === editingChild.id) {
        const first = editFirstName.trim();
        const last = editLastName.trim();
        return {
          ...ch,
          firstName: first,
          lastName: last,
          fullName: last ? `${first} ${last}` : first,
          room: editRoom.trim() || 'Toddler Room',
          avatarLetter: first.charAt(0).toUpperCase() || 'C',
          color: editColor,
        };
      }
      return ch;
    });

    onUpdateChildren(updated);
    setEditingChild(null);
  };

  const handleAddNewChild = () => {
    const newId = `child-${Date.now()}`;
    const newChild: Child = {
      id: newId,
      firstName: 'New Child',
      lastName: '',
      fullName: 'New Child',
      color: '#F43F5E',
      avatarLetter: 'N',
      room: 'Daycare Room',
      allergies: [],
    };
    const updated = [...childrenList, newChild];
    onUpdateChildren(updated);
    startEditChild(newChild);
  };

  const handleExport = () => {
    const payload = {
      children: childrenList,
      exportedAt: new Date().toISOString(),
      app: 'Little Labels',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'little-labels-backup.json';
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-100 text-neutral-900 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-neutral-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">Settings</h1>
            <p className="text-[11px] text-neutral-500 font-medium">Child Profiles & Preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Scroll Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-lg mx-auto w-full">
        {/* Privacy & Storage Guarantee Banner */}
        <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start gap-2.5 shadow-2xs">
          <Lock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h3 className="font-bold text-sky-950">100% On-Device Storage</h3>
            <p className="text-sky-800/80 text-[11px] mt-0.5 leading-relaxed">
              Your child's name, room, and daily labels are stored in your phone's private{' '}
              <code className="font-mono bg-sky-100 px-1 py-0.2 rounded text-[10px]">localStorage</code>.
              Data is never uploaded to GitHub or any cloud server.
            </p>
          </div>
        </div>

        {/* Child Profiles Section */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Child Profiles
              </h2>
            </div>

            <button
              onClick={handleAddNewChild}
              className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Child</span>
            </button>
          </div>

          <div className="space-y-2">
            {childrenList.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-xs shrink-0"
                    style={{ backgroundColor: ch.color }}
                  >
                    {ch.avatarLetter}
                  </div>
                  <div className="min-w-0 truncate">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">{ch.fullName}</h3>
                    <p className="text-[11px] text-neutral-500 truncate">{ch.room}</p>
                  </div>
                </div>

                <button
                  onClick={() => startEditChild(ch)}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
                >
                  <Edit2 className="w-3 h-3 text-neutral-500" />
                  <span>Edit Name</span>
                </button>
              </div>
            ))}
          </div>

          {/* Child Edit Drawer / Form */}
          {editingChild && (
            <form
              onSubmit={handleSaveChild}
              className="mt-3 p-3.5 bg-neutral-100/80 rounded-xl border border-neutral-200 space-y-3 animate-in fade-in"
            >
              <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-900">
                  Edit Profile: {editingChild.firstName}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingChild(null)}
                  className="text-xs text-neutral-500 hover:text-neutral-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    placeholder="e.g. Cameron"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    Last Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    placeholder="e.g. Zimmerman"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                  Classroom / Daycare Room
                </label>
                <input
                  type="text"
                  value={editRoom}
                  onChange={(e) => setEditRoom(e.target.value)}
                  placeholder="e.g. Toddler Room 2"
                  className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                  Theme Accent Color
                </label>
                <div className="flex gap-2">
                  {[
                    { name: 'Sky Blue', hex: '#0284C7' },
                    { name: 'Blush Pink', hex: '#F43F5E' },
                    { name: 'Sage Green', hex: '#10B981' },
                    { name: 'Warm Amber', hex: '#F59E0B' },
                  ].map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setEditColor(color.hex)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        editColor === color.hex
                          ? 'border-neutral-900 scale-110 shadow-xs'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save to Device Storage
              </button>
            </form>
          )}
        </div>

        {/* Printer & Hardware Section */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-neutral-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Thermal Printer Setup
            </h2>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">Printer Model</label>
            <select
              value={printerModel}
              onChange={(e) => setPrinterModel(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white"
            >
              <option value="Brother QL-810W">Brother QL-810W (Wi-Fi / AirPrint)</option>
              <option value="Brother QL-800">Brother QL-800 (USB)</option>
              <option value="Brother QL-1110NWB">Brother QL-1110NWB (Wide Format)</option>
            </select>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Label Format:</span>
              <span className="font-bold text-neutral-800">DK-1209 (2.1" × 1.1")</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Physical Size:</span>
              <span className="font-mono text-neutral-700">62 mm × 29 mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Print Method:</span>
              <span className="text-neutral-700">Direct Thermal (No Ink)</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-neutral-200">
              <span className="text-neutral-500">Hardware Status:</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Online
              </span>
            </div>
          </div>
        </div>

        {/* Formatting Preferences */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Formatting & Defaults
            </h2>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">Date Format on Label</label>
            <div className="grid grid-cols-3 gap-2">
              {['MM/DD/YY', 'DD/MM/YY', 'YYYY-MM-DD'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setDateFormat(fmt)}
                  className={`py-2 px-1 text-xs rounded-lg border text-center font-medium transition-all ${
                    dateFormat === fmt
                      ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Backup / Export */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Backup & Transfer
            </h2>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Transfer your saved profiles and favorites between phones or browsers anytime with a clean JSON file.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backup</span>
            </button>
            <button
              onClick={() => alert('Import backup dialog.')}
              className="flex-1 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Backup</span>
            </button>
          </div>

          {exportNotice && (
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5 font-medium animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>little-labels-backup.json downloaded!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
