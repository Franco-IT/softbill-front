import { ColorType, DataProps } from './types'

export const statusColorsMUI: { [key: string]: ColorType } = {
  ALL: undefined,
  APPROVED: 'success',
  ERROR: 'error',
  PENDING: 'warning'
}

export const bankStatusLabel: { [key: string]: string } = {
  APPROVED: 'Aprovado',
  PENDING: 'Pendente',
  ERROR: 'Erro'
}

export const monthName: { [key: string]: string } = {
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  octiber: 'Outubro',
  november: 'Novembro',
  dezember: 'Dezembro'
}

export const users: DataProps[] = [
  {
    avatar: undefined,
    name: 'Apple Inc.',
    status: 'APPROVED',
    banks: [
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAnFBMVEX9/DBQXvz//wBPXf08Tf/+/S1HVv///yP//ipAUf9NXP5EVP9LWv///xg+T/9JWP9TYfdXZPVRX/nt7k5ea/CRmMmOlcvc3m3k5WGhp7nr61Vjb+3Y2nWcor7i42ZbaPLO0YKEjdP29jx2gN/z9ETMz4bR1H2JkdC1uqJveuWYn8GxtqcuQ//Dx5F8htq+wZilq7NqdOjIy4ussa02pEKDAAACN0lEQVRIie2VS3ejMAyFsQzIYAzNkwB5EvJukqb9//9tZAOdbmI43cwsol1yfPNZuleO47zqVf9Ned7vdFiV+OOjwLIfDnZ+uIdvqBqNZ6IPzjm4nLsTUUMFHGM37xZ6sA59RuUP5xqqRqeA9RCiN3U5SyRpQ/eMiBc3Yvy9S+jBnvmMuwcnc0OCDlKYFTKRV7TrUEzofBTtQKh0JTU0U5BtK7vOU/M3fcObp88hnjVUrpag7KY2Jxlnd6COhIL6d9wPZW1QpQMzTFLGp1yovMgAJzQoJouZeq4TNa4WbkfkXSTHKexX3ECfNynWwwYYyTto72imc0jHus9iabksenqijAfbCu5BpF1UakFfdTZJHg79KDhCtY25yc1SOyLHtg5b6PQxgqtMKAJThA+Dy1SH+QaqoLwRLgnXkBfSuNhhYnvbT59w8caBS6xxC4V9hFhudMD9z3aqKcz5wem6Kq1vqHG3Eo7tVMlcn63BCkVH71MU3GmqQT3VOks0KBsUTQBCY2JCuAnCos2Sz3bPjURzjA/2sCxoi/eEk00EWRIcLUhl7K4N3JCluY5BE93KGgHEeuupOW2BgOubVuqu7e8GuW+mYZ4afYX8EZrodiQOxfQL1Ll5apRQX/oVoeh2PFNI6x6c8nbrs/xBEQhOo66Ai+W7WSDU7xW15gcGZ9+nWhg3C0Tbxc1KB49OnBG63/tqMhTFl26cEQ7/7iv9C/iPvAdOn63Ez9/HEvvgjNL68VWv+qf1B5krJ1ienbV/AAAAAElFTkSuQmCC',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,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',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAZlBMVEX/YgD/////UwD/UgD/VAD/XgD//vv/VwD/WgD/9e7/8ev/+PL/oX7/ilj/zrz/tJf/RgD/6N//0sH/uJ3/dTP/cSj/28z/m3P/k2f/fET/hFH/biD/yrf/wan/aRn/eDn/rpD/qYm01vDCAAAB80lEQVQ4jY2VbZejIAyFgQAB36vVWmvbnf//J/cG7c5Uz07Nh0L1OUAuyVXp9/Axk4i537xQ63iq6st0C0TGWIQxROE2Xerq9BOcJ2M5OOfUW+BBYGum+QWOtCE2PI0LONNvmATNCZx+XS+tOSXQfuKUsgKejoAngC1/BrkF2IXPYOgAFkfAAmD5MWmkXQI8HwHPAA9wIAF+vBcJ0sofA73KDUY2/0t9rSiTqwiQZ39nPNvSwVJ/eSQwqswq95Qycrex69+5Qqq2lzVNJiBy0jnjmvT1TYKQKjaBdgVDya6ptD7jrIENGcbbwGSZG8vfILdtRUOm9TD8MfUQ89ieQ6iH4ey4GqRqsLUkQ9i6WXqoXUf9tOkoJteiNJIRecjrSDVOfq9Hit1lvGPxZgGjFqUhjwwCGsIZnziboSagUP0bCMH1C1yzdmpOve8luW9wKYoFrFKfOWBDlW1At5TZP/AawpfWF2oGrRMYGi9gKrNyBUXe++PRAWwe2LuRjFStE1gurZBA/EHUcp1RZnR9+RYtrYDmMrmH7vwlIBX4rSrvDcusGzwETM2VhCdp7oA9cIX2ppjJyB3e3DJL7bo3ALebJQM4bCnHTeqw7R02UqhRWlhz2FtzgDXbstqYfVH2Tsx+CZh9vzP7n5+PPOIDEvefj7/qwxdZQ9Oq3AAAAABJRU5ErkJggg==',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAbFBMVEX////+AAD/wsL+h4f/ubn/5ub/3d3+eHj//Pz+a2v+gID/ycn+lZX/z8//tbX/4+P+DQ3+ZGT+OTn+jIz/7e3/paX+NDT/rKz/1tb+UlL+b2//sbH/8vL+LS3+FRX+nJz+JCT+Skr+QUH+WVnig5CQAAABPklEQVQ4jdWUyXKDMBBEpyUWgSQWCxmx2DjO//9jZCoFDgbMIRf3Aeiap4Lp6oLoM9Xrg2AZHAQRHwQLhEewkEpcDnBRSRpHXs5Pfhvg/T4xHNEV6N+BAwr/nYB5B1ZAQ2Rx3sciQQrgPstbtE0Je4Ml+nqsEgNIN+Ks8VBFwl+Jj2Y1pWQcwafjc3SnyS1l8KuUqMH9yS2ESYyy2WAHhNB7YDLPjJ2f+Ws212l4nrn7ytaixIteVxnlkgW201+pynNRFLd7O7ht6j+10VK3aJBQulwFLfvrWU35dMg+DeQCpKbtqVZRZoxk35qxoUpqToylMmcqjIf5F+MulGdZ5PtKhsK89feEOEmZ6MC1M+b73/M8izIPpMRFOoINMRkL34IJzDnTZALLuorTEHSdijxcSdVZoYIwrdYz+WD9AMk+DKTgpU+KAAAAAElFTkSuQmCC',
        name: 'Santander',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Google Inc.',
    status: 'PENDING',
    banks: [
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAnFBMVEX9/DBQXvz//wBPXf08Tf/+/S1HVv///yP//ipAUf9NXP5EVP9LWv///xg+T/9JWP9TYfdXZPVRX/nt7k5ea/CRmMmOlcvc3m3k5WGhp7nr61Vjb+3Y2nWcor7i42ZbaPLO0YKEjdP29jx2gN/z9ETMz4bR1H2JkdC1uqJveuWYn8GxtqcuQ//Dx5F8htq+wZilq7NqdOjIy4ussa02pEKDAAACN0lEQVRIie2VS3ejMAyFsQzIYAzNkwB5EvJukqb9//9tZAOdbmI43cwsol1yfPNZuleO47zqVf9Ned7vdFiV+OOjwLIfDnZ+uIdvqBqNZ6IPzjm4nLsTUUMFHGM37xZ6sA59RuUP5xqqRqeA9RCiN3U5SyRpQ/eMiBc3Yvy9S+jBnvmMuwcnc0OCDlKYFTKRV7TrUEzofBTtQKh0JTU0U5BtK7vOU/M3fcObp88hnjVUrpag7KY2Jxlnd6COhIL6d9wPZW1QpQMzTFLGp1yovMgAJzQoJouZeq4TNa4WbkfkXSTHKexX3ECfNynWwwYYyTto72imc0jHus9iabksenqijAfbCu5BpF1UakFfdTZJHg79KDhCtY25yc1SOyLHtg5b6PQxgqtMKAJThA+Dy1SH+QaqoLwRLgnXkBfSuNhhYnvbT59w8caBS6xxC4V9hFhudMD9z3aqKcz5wem6Kq1vqHG3Eo7tVMlcn63BCkVH71MU3GmqQT3VOks0KBsUTQBCY2JCuAnCos2Sz3bPjURzjA/2sCxoi/eEk00EWRIcLUhl7K4N3JCluY5BE93KGgHEeuupOW2BgOubVuqu7e8GuW+mYZ4afYX8EZrodiQOxfQL1Ll5apRQX/oVoeh2PFNI6x6c8nbrs/xBEQhOo66Ai+W7WSDU7xW15gcGZ9+nWhg3C0Tbxc1KB49OnBG63/tqMhTFl26cEQ7/7iv9C/iPvAdOn63Ez9/HEvvgjNL68VWv+qf1B5krJ1ienbV/AAAAAElFTkSuQmCC',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAn1BMVEXMCi/////MBi3GAADKAB/KABn47O7ZeIHqtrzEAAzLACPLACb34uXMACrz1trTSVrJABPJAAnVW2z79Pb03ODtxMnfj5rMGTHZdIHONEX8+frUU2Tw0NPjnqjbgIrUYXDjp7DciZHimKDYbHzMJjrVa3LOOUzPQVLch5fQLkvNJkLMPT7MMjbTX2fUWWTOFzjRUlrKHSnON1TPTE/US2T3suKNAAAKP0lEQVR4nO2diXKjuBaGPVowkRCGgGzAZjW2uzNjO+me93+2C3EnZjU7Zm7xVXVVp5PG/Ejn6CwSWSxmZmZmZmZmZmZmZp4MAIxSQhBChFIGnn07rQEEv0CFhcfTahuxOh2vTIEqRuzZd9YQhiEkKyMQOdd1XfpE1+UdF4PlikD4nxEEiAqZ6+0EQbP+ymFpgiTbLoMqffaNVkMh/BnsimSkJck/fkJ1yuMDGMEnT3is4460flPIRH0Co5u/Dbmukhv88A+g09PDULi1tWZSbsOz2kxseAAK92ILKZ9y7DNDzxZwByBwaCvlU453mYxvY/gi1rb6YnTbVCYx15SrJ3WTErNz6PPnGoCuXrGo1EPjJ+XJWtBLF2NJIxkvz1xFgXrqYYbd8T7I06RQ6jQcFqtiRuon9CQ/QEOvpgRNECR9J3p2ENi27Yk7SRK04ufgkqdMNbLidYQIOhcd9+0FRqifxH9TTNcXuSTkR8rfPGGqKZddpRJN58H+iKGCskkmoFiJMp6lx3O+0DNH99HwoFdJ0UV/u1BweSAZ5aL4evHFzJXEEx5TyWKhHircmMb9ywJXh5BR1rCJ9CQNyOKrUccGGo/jF8F2TVQ3GGYImYdUGsRPI6qBj8dFs6OwvlEphpHNe5CQw8ezG8V9qEX8mzZPuACjoX33BXwzkodGq0f55G7VNrVnqinen8g4qycxH/hkyVE6TBAKX7/H3Hvp75ZLYVexVIrGTbXbA1Xwd2rkDu+gAQjKh8WHnVdvBvd/lh0d9nG/DyGHUqe8u/Tx8QCtxE9HsBtcDDPLFn7LM3uaF8SMvbRwGdw7wzKDEYJNbzUJutl73mFwk1GNMi0O6HFhYOQ6fOzMaEkyJhg9pyF9PpoSyiaZcHh2LaI52C3OeoWLmvtZAED850b85RPu9xEMFYcx2uHmRKO7Z4zGEEIoA4CBTUwsh93+MYaxKSjDfqHFWEsYGRNB0f1vQvP0+/1yPhz2huP76zjjt+1gvf7hGMb+cD5f3n8fzU1k4De1z9NCfxYOjLWGaPF2vBwMZ217fKcXJfZfY/inrrFeHs6r45Vi3CxT6A+0LhwYfvYDT+S60KTqZGnSjou2v9ya5BktW3osLsboUofqrCBz0XO2VyVf8hgU3LTgV1+RtBMD9w2ro40QC8sj/x7QBJ0HWwTHaWzg8mi5LyxNEPdwBD2Mlqcx/cKNxZDzDTBCPx7XMPrWY360qInUgBFgvtuV5ct+EUTXpH03oaMxMc/r6qLyAMjO+6bP6cbw4rLmQ3nkSiTvEPYlh8I3J1vTHhlBdEKlBzlEOQa7pw3KXQ53QNf8mSgnr58mcme03b5TAYvCo1gdcX2HwL7jGHvXff2DuzcMx1nH0aesl0fQDeRws3XVCUDg1biF12v4EXFLt2452R+iL1mch0Xf3YRvx+3e93g329MC2G6uIVqr7arDxxnj57dAnHoShOM2pvrLsHnrgZIuLfwaQPu81VsFYZnTtIQBqBJJum4dcVe437ECyw4bL6LYzVxEkGRxHeYEWm/tPCZFClSu27UoS00DV35uqkZNZmBR6uQtjxiqMH/lj1ZabjD0AtEpGiKpke+XHNqsaKp8ZS2CLNrLE4Y4+v/kV+7Cy661WEAUuHj1I0H11Vg2beSkyTa+uBRvP74qX81inCvKWr/7KCwDpLDjIeD1J5wYNqqmk7O/Xl5MhhL1VjWXy/Cwp5gJUBSFso5Y1yPwRq0GQGgsJGVq+arsus+aV/R5UWhec99twz50/jZhri6z77dGH6V/H+FrveHhYbfPhtmnJlz6bzgwisN1HTlitw4BzHocfhwkSWcQGjViBLtTiS0nxuvL/nMo0KmM1q1ll3kBs74zGK7mDV4W6yo5+nuHhSEnxhlywztTTLtiJRU7PMysGG05bCOYoPPjPbmW2/4GsjYjHIbuaqPQeTg4HTY8wExqpQ/gmTMw8vthbXvfujAAM4Wz3fvwe0IB+mc9yNBkw5ndaYwzFYzsH3i1Y9vnCTOBJj+OckAE4Eu54Xhth0ZxMmLMkbpCyqW0ECLhlt4ZZXLp0cQ82EBptZ3q9O0p0yxGXZZkbpbRdlMIfJoYoJRE0pad3xVSj8yqOY43u8FoyYkDsbWYtG+WVyOePSBmcWTD204z/CN1nREigASqXyKmpTujx9R1ho/NkgBYaDW87TQDm5RPGTpqzpBds//YTOstbiRthc6o55HpzyIxrUOABUnHAHZBCWdAcEEZympcuf+GblMuRRysBlAILmiyWO09KgtT82zMhSYCOXkxAmv9PAFIJRfCedRDbiTbZ4ngHfajk3NqnhmjiqGveTHtU81423xqngWjegC6z5tMp71PyE8ZzWhJQAzJ24zd6dQDSedJvfRn6oLy3uyj08ME6Sa0MebIoFxOE3Tc4Y5SJwD5x3hGQ/7NapG6Hq8Di2QeYJnjzbN8e6i7M8WpDHY92lEG8pbV0kMAwljyCUljHNb7RM0OjHzqYZXDbnJo/h0pDVCyrW7h0EsPAietpks80eQzV5lik+b3szed/ErENNbbGCEN2WQmmRZ0W2LupDYEiCMMDSPZXoDX2yZUoCbGXGhdu64Ny1XNPNzfap3KYAe3GkayXQ0b9rlWJ4sLwsCnj+kmU8mw/H4fH/hINJ74YsgIjWTfBCMYfU8Ftr2bjea3GhpA6iwUSrYPKL/2PhFA8i1ArdZiQlbbygSe4UO696iJQ7wsiG0Sb4dovlWDqSdPloPr4xtDm3U67Jf8jvt/SqCJDFpbNgwtlM3nXizp9dGtAfWdp10y3zbc0Vgb+us+A6RG5Suk7m9b8oXlg/mPkJ8OYTTHHO6NGigRLzXI0pj66+uBPxCT+KmvjwjpkF5TWd2dgF03F1DQ/dWU5WKwEqSlSO6DFyT1gppQ49TpLQCKk7u/i8UARpTMHnHhBxr+nS0wocat7mLTzTblaYvERFJCN10iF7yw1/ilDLj99p1WpRq2yi7meTGUmEY63JfEFRyp0qBsvwtpwr7iPQ0oG8jnxBB8dNJ2r3tbZbx36qHT94N88NYJgBYAVIkByilIS5FHlbKI+8Del+EITkkui7BbLYYhX05K0bi/GsHu09DQ/zIcqbBny+CRy6hSjOIlXZjgHcxaoWjPMLb9cj92fp4BBXnCX8LLokIM2SbiMNk5bchzXuEcRfN//NQ6NzL4ZR8HCtVi0HePURNXA50DrgeAny85zW6nAUxZ3VaWajELVb5ZiksU+uSXhSBoiHbmuAEgf38lCjXEMOztRAPAtlvIekWB2cWN3l+AWENMNLwQ9nFSdhBwom9XR8ykSR7r+O+LkWYx02QWM1VmMVNlFjNVZjFTZRYzVWYxU2UWM1VmMVNlFjNVZjFTZRYzVWYxU2UWM1XSYqq7zZPm/3hkZjHTYRYzVWYxU6WyQSuPezi6E3gpf8MxAMSWU3Dj+b/WuD7otPom/q06x1UKcxJ7MWoT/+qcG5/ziZEUU92MMTMzMzMzMzMzM1PA/wAbf7mbnHOo9AAAAABJRU5ErkJggg==',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAZlBMVEX/YgD/////UwD/UgD/VAD/XgD//vv/VwD/WgD/9e7/8ev/+PL/oX7/ilj/zrz/tJf/RgD/6N//0sH/uJ3/dTP/cSj/28z/m3P/k2f/fET/hFH/biD/yrf/wan/aRn/eDn/rpD/qYm01vDCAAAB80lEQVQ4jY2VbZejIAyFgQAB36vVWmvbnf//J/cG7c5Uz07Nh0L1OUAuyVXp9/Axk4i537xQ63iq6st0C0TGWIQxROE2Xerq9BOcJ2M5OOfUW+BBYGum+QWOtCE2PI0LONNvmATNCZx+XS+tOSXQfuKUsgKejoAngC1/BrkF2IXPYOgAFkfAAmD5MWmkXQI8HwHPAA9wIAF+vBcJ0sofA73KDUY2/0t9rSiTqwiQZ39nPNvSwVJ/eSQwqswq95Qycrex69+5Qqq2lzVNJiBy0jnjmvT1TYKQKjaBdgVDya6ptD7jrIENGcbbwGSZG8vfILdtRUOm9TD8MfUQ89ieQ6iH4ey4GqRqsLUkQ9i6WXqoXUf9tOkoJteiNJIRecjrSDVOfq9Hit1lvGPxZgGjFqUhjwwCGsIZnziboSagUP0bCMH1C1yzdmpOve8luW9wKYoFrFKfOWBDlW1At5TZP/AawpfWF2oGrRMYGi9gKrNyBUXe++PRAWwe2LuRjFStE1gurZBA/EHUcp1RZnR9+RYtrYDmMrmH7vwlIBX4rSrvDcusGzwETM2VhCdp7oA9cIX2ppjJyB3e3DJL7bo3ALebJQM4bCnHTeqw7R02UqhRWlhz2FtzgDXbstqYfVH2Tsx+CZh9vzP7n5+PPOIDEvefj7/qwxdZQ9Oq3AAAAABJRU5ErkJggg==',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'PENDING',
        status: 'PENDING'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Facebook Inc.',
    status: 'ERROR',
    banks: [
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAnFBMVEX9/DBQXvz//wBPXf08Tf/+/S1HVv///yP//ipAUf9NXP5EVP9LWv///xg+T/9JWP9TYfdXZPVRX/nt7k5ea/CRmMmOlcvc3m3k5WGhp7nr61Vjb+3Y2nWcor7i42ZbaPLO0YKEjdP29jx2gN/z9ETMz4bR1H2JkdC1uqJveuWYn8GxtqcuQ//Dx5F8htq+wZilq7NqdOjIy4ussa02pEKDAAACN0lEQVRIie2VS3ejMAyFsQzIYAzNkwB5EvJukqb9//9tZAOdbmI43cwsol1yfPNZuleO47zqVf9Ned7vdFiV+OOjwLIfDnZ+uIdvqBqNZ6IPzjm4nLsTUUMFHGM37xZ6sA59RuUP5xqqRqeA9RCiN3U5SyRpQ/eMiBc3Yvy9S+jBnvmMuwcnc0OCDlKYFTKRV7TrUEzofBTtQKh0JTU0U5BtK7vOU/M3fcObp88hnjVUrpag7KY2Jxlnd6COhIL6d9wPZW1QpQMzTFLGp1yovMgAJzQoJouZeq4TNa4WbkfkXSTHKexX3ECfNynWwwYYyTto72imc0jHus9iabksenqijAfbCu5BpF1UakFfdTZJHg79KDhCtY25yc1SOyLHtg5b6PQxgqtMKAJThA+Dy1SH+QaqoLwRLgnXkBfSuNhhYnvbT59w8caBS6xxC4V9hFhudMD9z3aqKcz5wem6Kq1vqHG3Eo7tVMlcn63BCkVH71MU3GmqQT3VOks0KBsUTQBCY2JCuAnCos2Sz3bPjURzjA/2sCxoi/eEk00EWRIcLUhl7K4N3JCluY5BE93KGgHEeuupOW2BgOubVuqu7e8GuW+mYZ4afYX8EZrodiQOxfQL1Ll5apRQX/oVoeh2PFNI6x6c8nbrs/xBEQhOo66Ai+W7WSDU7xW15gcGZ9+nWhg3C0Tbxc1KB49OnBG63/tqMhTFl26cEQ7/7iv9C/iPvAdOn63Ez9/HEvvgjNL68VWv+qf1B5krJ1ienbV/AAAAAElFTkSuQmCC',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      },
      {
        avatar:
          'data:image/png;base64,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',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAZlBMVEX/YgD/////UwD/UgD/VAD/XgD//vv/VwD/WgD/9e7/8ev/+PL/oX7/ilj/zrz/tJf/RgD/6N//0sH/uJ3/dTP/cSj/28z/m3P/k2f/fET/hFH/biD/yrf/wan/aRn/eDn/rpD/qYm01vDCAAAB80lEQVQ4jY2VbZejIAyFgQAB36vVWmvbnf//J/cG7c5Uz07Nh0L1OUAuyVXp9/Axk4i537xQ63iq6st0C0TGWIQxROE2Xerq9BOcJ2M5OOfUW+BBYGum+QWOtCE2PI0LONNvmATNCZx+XS+tOSXQfuKUsgKejoAngC1/BrkF2IXPYOgAFkfAAmD5MWmkXQI8HwHPAA9wIAF+vBcJ0sofA73KDUY2/0t9rSiTqwiQZ39nPNvSwVJ/eSQwqswq95Qycrex69+5Qqq2lzVNJiBy0jnjmvT1TYKQKjaBdgVDya6ptD7jrIENGcbbwGSZG8vfILdtRUOm9TD8MfUQ89ieQ6iH4ey4GqRqsLUkQ9i6WXqoXUf9tOkoJteiNJIRecjrSDVOfq9Hit1lvGPxZgGjFqUhjwwCGsIZnziboSagUP0bCMH1C1yzdmpOve8luW9wKYoFrFKfOWBDlW1At5TZP/AawpfWF2oGrRMYGi9gKrNyBUXe++PRAWwe2LuRjFStE1gurZBA/EHUcp1RZnR9+RYtrYDmMrmH7vwlIBX4rSrvDcusGzwETM2VhCdp7oA9cIX2ppjJyB3e3DJL7bo3ALebJQM4bCnHTeqw7R02UqhRWlhz2FtzgDXbstqYfVH2Tsx+CZh9vzP7n5+PPOIDEvefj7/qwxdZQ9Oq3AAAAABJRU5ErkJggg==',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Microsoft Inc.',
    status: 'ERROR',
    banks: [
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAnFBMVEX9/DBQXvz//wBPXf08Tf/+/S1HVv///yP//ipAUf9NXP5EVP9LWv///xg+T/9JWP9TYfdXZPVRX/nt7k5ea/CRmMmOlcvc3m3k5WGhp7nr61Vjb+3Y2nWcor7i42ZbaPLO0YKEjdP29jx2gN/z9ETMz4bR1H2JkdC1uqJveuWYn8GxtqcuQ//Dx5F8htq+wZilq7NqdOjIy4ussa02pEKDAAACN0lEQVRIie2VS3ejMAyFsQzIYAzNkwB5EvJukqb9//9tZAOdbmI43cwsol1yfPNZuleO47zqVf9Ned7vdFiV+OOjwLIfDnZ+uIdvqBqNZ6IPzjm4nLsTUUMFHGM37xZ6sA59RuUP5xqqRqeA9RCiN3U5SyRpQ/eMiBc3Yvy9S+jBnvmMuwcnc0OCDlKYFTKRV7TrUEzofBTtQKh0JTU0U5BtK7vOU/M3fcObp88hnjVUrpag7KY2Jxlnd6COhIL6d9wPZW1QpQMzTFLGp1yovMgAJzQoJouZeq4TNa4WbkfkXSTHKexX3ECfNynWwwYYyTto72imc0jHus9iabksenqijAfbCu5BpF1UakFfdTZJHg79KDhCtY25yc1SOyLHtg5b6PQxgqtMKAJThA+Dy1SH+QaqoLwRLgnXkBfSuNhhYnvbT59w8caBS6xxC4V9hFhudMD9z3aqKcz5wem6Kq1vqHG3Eo7tVMlcn63BCkVH71MU3GmqQT3VOks0KBsUTQBCY2JCuAnCos2Sz3bPjURzjA/2sCxoi/eEk00EWRIcLUhl7K4N3JCluY5BE93KGgHEeuupOW2BgOubVuqu7e8GuW+mYZ4afYX8EZrodiQOxfQL1Ll5apRQX/oVoeh2PFNI6x6c8nbrs/xBEQhOo66Ai+W7WSDU7xW15gcGZ9+nWhg3C0Tbxc1KB49OnBG63/tqMhTFl26cEQ7/7iv9C/iPvAdOn63Ez9/HEvvgjNL68VWv+qf1B5krJ1ienbV/AAAAAElFTkSuQmCC',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      },
      {
        avatar:
          'data:image/png;base64,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',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAZlBMVEX/YgD/////UwD/UgD/VAD/XgD//vv/VwD/WgD/9e7/8ev/+PL/oX7/ilj/zrz/tJf/RgD/6N//0sH/uJ3/dTP/cSj/28z/m3P/k2f/fET/hFH/biD/yrf/wan/aRn/eDn/rpD/qYm01vDCAAAB80lEQVQ4jY2VbZejIAyFgQAB36vVWmvbnf//J/cG7c5Uz07Nh0L1OUAuyVXp9/Axk4i537xQ63iq6st0C0TGWIQxROE2Xerq9BOcJ2M5OOfUW+BBYGum+QWOtCE2PI0LONNvmATNCZx+XS+tOSXQfuKUsgKejoAngC1/BrkF2IXPYOgAFkfAAmD5MWmkXQI8HwHPAA9wIAF+vBcJ0sofA73KDUY2/0t9rSiTqwiQZ39nPNvSwVJ/eSQwqswq95Qycrex69+5Qqq2lzVNJiBy0jnjmvT1TYKQKjaBdgVDya6ptD7jrIENGcbbwGSZG8vfILdtRUOm9TD8MfUQ89ieQ6iH4ey4GqRqsLUkQ9i6WXqoXUf9tOkoJteiNJIRecjrSDVOfq9Hit1lvGPxZgGjFqUhjwwCGsIZnziboSagUP0bCMH1C1yzdmpOve8luW9wKYoFrFKfOWBDlW1At5TZP/AawpfWF2oGrRMYGi9gKrNyBUXe++PRAWwe2LuRjFStE1gurZBA/EHUcp1RZnR9+RYtrYDmMrmH7vwlIBX4rSrvDcusGzwETM2VhCdp7oA9cIX2ppjJyB3e3DJL7bo3ALebJQM4bCnHTeqw7R02UqhRWlhz2FtzgDXbstqYfVH2Tsx+CZh9vzP7n5+PPOIDEvefj7/qwxdZQ9Oq3AAAAABJRU5ErkJggg==',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Amazon Inc.',
    status: 'APPROVED',
    banks: [
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAnFBMVEX9/DBQXvz//wBPXf08Tf/+/S1HVv///yP//ipAUf9NXP5EVP9LWv///xg+T/9JWP9TYfdXZPVRX/nt7k5ea/CRmMmOlcvc3m3k5WGhp7nr61Vjb+3Y2nWcor7i42ZbaPLO0YKEjdP29jx2gN/z9ETMz4bR1H2JkdC1uqJveuWYn8GxtqcuQ//Dx5F8htq+wZilq7NqdOjIy4ussa02pEKDAAACN0lEQVRIie2VS3ejMAyFsQzIYAzNkwB5EvJukqb9//9tZAOdbmI43cwsol1yfPNZuleO47zqVf9Ned7vdFiV+OOjwLIfDnZ+uIdvqBqNZ6IPzjm4nLsTUUMFHGM37xZ6sA59RuUP5xqqRqeA9RCiN3U5SyRpQ/eMiBc3Yvy9S+jBnvmMuwcnc0OCDlKYFTKRV7TrUEzofBTtQKh0JTU0U5BtK7vOU/M3fcObp88hnjVUrpag7KY2Jxlnd6COhIL6d9wPZW1QpQMzTFLGp1yovMgAJzQoJouZeq4TNa4WbkfkXSTHKexX3ECfNynWwwYYyTto72imc0jHus9iabksenqijAfbCu5BpF1UakFfdTZJHg79KDhCtY25yc1SOyLHtg5b6PQxgqtMKAJThA+Dy1SH+QaqoLwRLgnXkBfSuNhhYnvbT59w8caBS6xxC4V9hFhudMD9z3aqKcz5wem6Kq1vqHG3Eo7tVMlcn63BCkVH71MU3GmqQT3VOks0KBsUTQBCY2JCuAnCos2Sz3bPjURzjA/2sCxoi/eEk00EWRIcLUhl7K4N3JCluY5BE93KGgHEeuupOW2BgOubVuqu7e8GuW+mYZ4afYX8EZrodiQOxfQL1Ll5apRQX/oVoeh2PFNI6x6c8nbrs/xBEQhOo66Ai+W7WSDU7xW15gcGZ9+nWhg3C0Tbxc1KB49OnBG63/tqMhTFl26cEQ7/7iv9C/iPvAdOn63Ez9/HEvvgjNL68VWv+qf1B5krJ1ienbV/AAAAAElFTkSuQmCC',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,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',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAZlBMVEX/YgD/////UwD/UgD/VAD/XgD//vv/VwD/WgD/9e7/8ev/+PL/oX7/ilj/zrz/tJf/RgD/6N//0sH/uJ3/dTP/cSj/28z/m3P/k2f/fET/hFH/biD/yrf/wan/aRn/eDn/rpD/qYm01vDCAAAB80lEQVQ4jY2VbZejIAyFgQAB36vVWmvbnf//J/cG7c5Uz07Nh0L1OUAuyVXp9/Axk4i537xQ63iq6st0C0TGWIQxROE2Xerq9BOcJ2M5OOfUW+BBYGum+QWOtCE2PI0LONNvmATNCZx+XS+tOSXQfuKUsgKejoAngC1/BrkF2IXPYOgAFkfAAmD5MWmkXQI8HwHPAA9wIAF+vBcJ0sofA73KDUY2/0t9rSiTqwiQZ39nPNvSwVJ/eSQwqswq95Qycrex69+5Qqq2lzVNJiBy0jnjmvT1TYKQKjaBdgVDya6ptD7jrIENGcbbwGSZG8vfILdtRUOm9TD8MfUQ89ieQ6iH4ey4GqRqsLUkQ9i6WXqoXUf9tOkoJteiNJIRecjrSDVOfq9Hit1lvGPxZgGjFqUhjwwCGsIZnziboSagUP0bCMH1C1yzdmpOve8luW9wKYoFrFKfOWBDlW1At5TZP/AawpfWF2oGrRMYGi9gKrNyBUXe++PRAWwe2LuRjFStE1gurZBA/EHUcp1RZnR9+RYtrYDmMrmH7vwlIBX4rSrvDcusGzwETM2VhCdp7oA9cIX2ppjJyB3e3DJL7bo3ALebJQM4bCnHTeqw7R02UqhRWlhz2FtzgDXbstqYfVH2Tsx+CZh9vzP7n5+PPOIDEvefj7/qwxdZQ9Oq3AAAAABJRU5ErkJggg==',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      }
    ]
  }
]

export const formatNameBank = (name: string) => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}
